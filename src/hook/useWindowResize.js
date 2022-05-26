/**
 * 监听浏览器缩放，使用防抖函数做触发次数太多的处理
 */

import _ from 'lodash'
import { onMounted, onUnmounted } from "vue"

const useWindowResize = (resize, delay = 0, immediate = true) => {
  const onResize = () => {
    resize()
  }
  onMounted(() => {
    onResize()  // 手动触发一次
    window.addEventListener('resize', _.debounce(onResize, delay, immediate))
  })

  onUnmounted(() => {
    window.removeEventListener('resize', _.debounce(onResize, delay, immediate))
  })
}

export default useWindowResize