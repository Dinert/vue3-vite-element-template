import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import directives from './directive'

// 图标 
import 'https://at.alicdn.com/t/font_3370983_ozossfu4xp.js'
import 'https://at.alicdn.com/t/font_3373809_s6055kmhlcp.js'

// 样式
import '@/assets/style/scss/index.scss'
import 'nprogress/nprogress.css' 


// 主题
import '@/theme/default.scss'




const app = createApp(App)
app.use(createPinia())
app.use(directives)
app.use(router).mount('#app')
