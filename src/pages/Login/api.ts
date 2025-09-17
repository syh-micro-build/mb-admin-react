import request from '../../axios'
import { LoginFormType } from '.'

interface RoleParams {
  roleName: string
}

export const loginApi = (data: LoginFormType) => request.post(
  {
    url: '/mock/user/login',
    data: {
      username: data.username,
      password: data.password
    }
  }
)

export const getAdminRoleApi = (params: RoleParams) => request.get(
  {
    url: '/mock/role/list',
    params
  }
)