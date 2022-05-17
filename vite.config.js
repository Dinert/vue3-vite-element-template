import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { devPro } from './src/utils'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
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
