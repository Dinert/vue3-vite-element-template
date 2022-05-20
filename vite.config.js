import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { devPro } from './src/utils'

const fs = require('fs')

// https://vitejs.dev/config/  暂时解决开发环境中Element-plus打包慢的问题
export default defineConfig(async ({ command, mode }) => {
  const optimizeDepsElementPlusIncludes = ['element-plus/es']
  fs.readdirSync('node_modules/element-plus/es/components').map(dirname => {
    fs.access(`node_modules/element-plus/es/components/${dirname}/style/css.mjs`, err => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(`element-plus/es/components/${dirname}/style/css`)
      }
    })
  })
  return {
    base: devPro('./', '/'),
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: [
          'vue', 'vue-router'
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      },

      // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/scss/variabled.scss"; @import "@/assets/style/scss/common.scss";'
        }
      }
    },
    optimizeDeps: {
      include: optimizeDepsElementPlusIncludes
    },
    server: {
      proxy: {
        '/zwjd-system': {
          target: 'http://develop.iot-cas.com:8081/zwjd-system',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/zwjd-system/, '')
        }
      }
    }
  }
})
