import type { AxiosResponse, InternalAxiosRequestConfig } from './types'
import { message } from 'antd';
import qs from 'qs'
import { objToFormData } from '../utils'

const defaultHttpConfig = {
  SUCCESS_CODE: 200, // 请求成功状态码
  CONTENT_TYPE: 'application/json;charset=UTF-8', // 默认请求头
  REQUEST_TIMEOUT: 10000, // 请求超时时间
  NO_REDIRECT_WHITE_LIST: ['/login'], // 不需要重定向的白名单
  NO_RESET_WHITE_LIST: ['Redirect', 'RedirectCon', 'Login', 'NoFind', 'Root'],  // 不需要重置路由的白名单
  TRANSFORM_REQUEST_DATA: true, // 是否根据headers->content-type自动转换数据格式
}


const defaultRequestInterceptors = (config: InternalAxiosRequestConfig) => {
  if (
    config.method === 'post' &&
    config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    config.data = qs.stringify(config.data)
  } else if (
    defaultHttpConfig.TRANSFORM_REQUEST_DATA &&
    config.method === 'post' &&
    config.headers['Content-Type'] === 'multipart/form-data' &&
    !(config.data instanceof FormData)
  ) {
    config.data = objToFormData(config.data)
  }
  if (config.method === 'get' && config.params) {
    let url = config.url as string
    url += '?'
    const keys = Object.keys(config.params)
    for (const key of keys) {
      if (config.params[key] !== void 0 && config.params[key] !== null) {
        url += `${key}=${encodeURIComponent(config.params[key])}&`
      }
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
    config.url = url
  }
  return config
}

const defaultResponseInterceptors = (response: AxiosResponse) => {
  if (response?.config?.responseType === 'blob') {
    // 如果是文件流，直接过
    return response
  } else if (response.status === defaultHttpConfig.SUCCESS_CODE) {
    // 模拟实际业务请求返回态
    return {
      code: response.status,
      data: response.data,
    }
  } else {
    message.error(response?.data?.message)
    if (response?.data?.code === 401) {
      // 清空用户信息，返回登录，重新认证获取最新角色权限。。。
    }
  }
}

export { defaultResponseInterceptors, defaultRequestInterceptors, defaultHttpConfig }
