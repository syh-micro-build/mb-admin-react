import { useDispatch, useSelector } from "react-redux"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { counterSlice } from "./counterSlice"
import { quotesApiSlice } from "./quotesApiSlice"
import { authSlice, authPersistConfig } from "./authSlice"

// 对 authSlice 的 reducer 应用持久化
const persistedAuthReducer = persistReducer(authPersistConfig, authSlice.reducer)

// `combineSlices` 会根据它们的 `reducerPath` 自动组合 reducer，
// 因此我们不再需要调用 `combineReducers`。
const rootReducer = combineSlices(
  counterSlice,
  quotesApiSlice,
  { ...authSlice, reducer: persistedAuthReducer } // 替换原始 authSlice 的 reducer
)

// 使用 `makeStore` 包装 store 的设置，以便在需要相同 store 配置的测试中复用
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // 添加 API 中间件以启用缓存、失效、轮询以及 `rtk-query` 的其他有用功能。
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // 忽略 redux-persist 的序列化检查
        },
      }).concat(quotesApiSlice.middleware)
    },
    preloadedState,
  })
  // 使用提供的默认值配置监听器
  // 可选，但对于 `refetchOnFocus`/`refetchOnReconnect` 行为是必需的
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

// 创建持久化存储
export const persistor = persistStore(store)

/**
 * 获取持久化状态
 * @description 解决 react-persist 异步机制导致的 localstorage 取值延迟问题，并递归解析嵌套的 JSON 字符串
 * @param key 持久化的 slice 名称
 * @returns 持久化状态
 */
export const getPersistedState = (key: string) => {
  const persistedState = localStorage.getItem(`persist:${key}`);
  if (!persistedState) return null;

  const deepParse = (value: any): any => {
    try {
      const parsed = JSON.parse(value);
      return typeof parsed === "object" && parsed !== null
        ? Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, deepParse(v)]))
        : parsed;
    } catch {
      return value;
    }
  };

  return deepParse(persistedState);
};


// 在整个应用中使用这些 hooks 替代原始的 `useDispatch` 和 `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// 从根 reducer 推断 `RootState` 类型
export type RootState = ReturnType<typeof rootReducer>
// 推断 `store` 的类型
export type AppStore = typeof store
// 从 store 本身推断 `AppDispatch` 类型
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>