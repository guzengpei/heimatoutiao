import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log(config)
  // 在发送请求之前做些什么
  // console.log(config)
  if (store.state.user && store.state.user.token) {
    config.headers = { Authorization: 'Bearer ' + store.state.user.token }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default instance
