import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import _ from 'lodash'
const config = reactive({
  locale: zhCn,
  size: 'default',
  button: {
    autoInsertSpace: true
  },
  message: {
    max: 3
  }
})

const resize = () => {
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight
  // if (clientWidth <= 1366 && clientHeight <= 768) {
  //     config.size = 'default'
  // } else 
  if(clientWidth <= 1920 && clientHeight <= 1080) {
      config.size = 'default'
  }else {
      config.size = 'large'
  }
}
window.addEventListener('resize', _.debounce(resize, 100), false)
resize()

export default config
