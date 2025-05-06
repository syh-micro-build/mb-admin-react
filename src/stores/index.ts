import { useDispatch, useSelector } from "react-redux"
import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "./counterSlice"
import { quotesApiSlice } from "./quotesApiSlice"

// `combineSlices` 会根据它们的 `reducerPath` 自动组合 reducer，
// 因此我们不再需要调用 `combineReducers`。
const rootReducer = combineSlices(counterSlice, quotesApiSlice)

// 使用 `makeStore` 包装 store 的设置，以便在需要相同 store 配置的测试中复用
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    // 添加 API 中间件以启用缓存、失效、轮询以及 `rtk-query` 的其他有用功能。
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    },
    preloadedState,
  })
  // 使用提供的默认值配置监听器
  // 可选，但对于 `refetchOnFocus`/`refetchOnReconnect` 行为是必需的
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

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