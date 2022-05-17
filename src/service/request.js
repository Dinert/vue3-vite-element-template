import axios from "axios";
import { ElMessage, ElLoading } from 'element-plus'
import { storage } from '@/utils'
import router from "../router";

const instance = axios.create({
  baseURL: '/zwjd-system',
  timeout: 10000
})

// 收集请求依赖
const loadingArr = []
let loading;

// 错误的处理方式
const errorHandle = (data) => {
  if (Number(data.code) === 0 && data.status === 'A0200') {
    ElMessage({
      message: data.msg,
      type: 'error'
    })

    if(data.msg === '用户凭证已过期！') {
      storage('localStorage', 'clear', 'zwjd-token')
      router.push('/login')
    }
  } else if(data.code === 'ECONNABORTED') {
    ElMessage({
      message: '请求超时',
      type: 'error'
    })
  }
}

// 请求拦截器
instance.interceptors.request.use(config => {
  config.loading = config.loading || {}
  config.loading.isLoading = config.loading.isLoading || true
  // 加载条
  if (loadingArr && loadingArr.length === 0 && config.loading.isLoading) {
    loading = ElLoading.service({
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.2)',
      ...config.loading
    })
  }

  // 等于post请求时的处理
  if (config.method.toLocaleLowerCase() === 'post') {
    config.headers.hideNotify = true
  }
  const token = storage("localStorage", "zwjd-token");

  if (token && token.token) {
    config.headers['Authorization'] = token.token
  }

  loadingArr.push(config)
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(response => {
  const data = response.data
  errorHandle(data)
  loadingArr.pop()
  if (loadingArr && loadingArr.length === 0) {
    loading && loading.close && loading.close()
  }
  return data && data.data
}, error => {

  errorHandle(error)
  loadingArr.pop()
  if (loadingArr && loadingArr.length === 0) {
    loading && loading.close && loading.close()
  }

  return Promise.reject(error)
})

const request = (config) => {
  return instance.request(config)
}

export default request
