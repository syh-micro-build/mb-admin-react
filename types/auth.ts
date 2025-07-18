// 用户信息类型定义
export interface User {
  username: string
  password: string
  role: string
  roleId: number
  permissions: string | string[]
}

export interface AuthStorageState {
  token: string | null;
  loginInfo: { username?: string; password?: string } | null; // 登录信息
  autoLogin: boolean; // 是否启用自动登录
  userInfo: User | null;
}

// 认证状态类型
export interface AuthState extends AuthStorageState {
  loading: boolean; // 是否正在加载
  error: {message: string} | null; // 错误信息
}
    