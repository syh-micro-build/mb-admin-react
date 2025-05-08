import service from './service'
import { defaultHttpConfig } from './config'
import type {
  RequestConfig,
  IResponse
} from './types'

const request = (option: RequestConfig) => {
  const { url, method, params, data, headers, responseType } = option

  return service.request({
    url: url,
    method,
    params,
    data: data,
    responseType: responseType,
    headers: {
      'Content-Type': defaultHttpConfig.CONTENT_TYPE,
      'Authorization': '',
      ...headers
    }
  })
}

export default {
  get: <T = any>(option: RequestConfig) => {
    return request({ method: 'get', ...option }) as Promise<IResponse<T>>
  },
  post: <T = any>(option: RequestConfig) => {
    return request({ method: 'post', ...option }) as Promise<IResponse<T>>
  },
  delete: <T = any>(option: RequestConfig) => {
    return request({ method: 'delete', ...option }) as Promise<IResponse<T>>
  },
  put: <T = any>(option: RequestConfig) => {
    return request({ method: 'put', ...option }) as Promise<IResponse<T>>
  },
  cancelRequest: (url: string | string[]) => {
    return service.cancelRequest(url)
  },
  cancelAllRequest: () => {
    return service.cancelAllRequest()
  }
}
