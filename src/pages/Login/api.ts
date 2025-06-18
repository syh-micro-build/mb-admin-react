import request from '../../axios'
import { LoginFormType } from '.'

export const loginApi = (data: LoginFormType) => request.post(
  {
    url: '/mock/user/login',
    data: {
      username: data.username,
      password: data.password
    }
  }
)