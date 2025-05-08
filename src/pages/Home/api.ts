import request from '../../axios'

// 测试 axios 请求
export const getTestApi = () => {
  return request.get({ url: 'https://dummyjson.com/posts/1' })
}
