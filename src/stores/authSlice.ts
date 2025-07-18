import { PayloadAction } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage" // 使用 localStorage 作为默认存储
import { createAppSlice } from "./createAppSlice"
import { AuthState, User } from '../../types/auth';

// 如果需要加密持久化，可以使用 `redux-persist-transform-encrypt`
// import createEncryptor from "redux-persist-transform-encrypt"
// const encryptor = createEncryptor({
//   secretKey: "your-secret-key", // 替换为安全的密钥
//   onError: error => {
//     console.error("Encryption error:", error)
//   },
// })

// 配置持久化
export const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ['token', 'userInfo', 'autoLogin', 'loginInfo'], // 持久化的状态
  // transforms: [encryptor], // 添加加密转换器
}

// 初始状态
const initialState: AuthState = {
  token: null,
  userInfo: null,
  autoLogin: false,
  loginInfo: null,
  loading: false,
  error: null
};

// 创建认证Slice，如果不使用异步 thunk，可以使用独立的 `createSlice`。
export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 清除错误信息
    clearError: (state) => {
      state.error = null;
    },
    // 设置token
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    // 设置用户信息
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    // 设置登录信息
    setLoginInfo: (state, action: PayloadAction<{ username?: string; password?: string } | undefined>) => {
      state.loginInfo = action.payload || null;
    },
    // 设置自动登录状态
    setAutoLogin: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        // 如果自动登录为true，则保存用户名和密码
        state.autoLogin = true;
      } else {
        // 否则清除
        state.autoLogin = false;
        state.loginInfo = null;
      }
    },
    // 退出登录
    authReset: (state) => {
      state.token = null;
      state.userInfo = null;
      state.loginInfo = null;
      state.loading = false;
      state.error = null;
    }
  },
  selectors: {
    // 获取当前用户信息
    selectorUser: (state: AuthState) => state.userInfo,
  }
});

export const { clearError, setAutoLogin, setLoginInfo, setUserInfo, authReset } = authSlice.actions;

export const { selectorUser } = authSlice.selectors;
    