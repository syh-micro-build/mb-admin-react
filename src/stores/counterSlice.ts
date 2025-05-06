import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"
import type { AppThunk } from "./"

// 模拟异步请求
const fetchCount = (amount = 1): Promise<{ data: number }> =>
  new Promise<{ data: number }>(resolve =>
    setTimeout(() => {
      resolve({ data: amount })
    }, 500),
  )

export type CounterSliceState = {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
}

// 如果不使用异步 thunk，可以使用独立的 `createSlice`。
export const counterSlice = createAppSlice({
  name: "counter",
  // `createSlice` 会根据 `initialState` 参数推断状态类型
  initialState,
  // `reducers` 字段允许我们定义 reducer 并生成相关的 action
  reducers: create => ({
    increment: create.reducer(state => {
      // Redux Toolkit 允许我们在 reducer 中编写“可变”的逻辑。
      // 它实际上并不会直接修改状态，因为它使用了 Immer 库，
      // Immer 会检测“草稿状态”的更改，并基于这些更改生成全新的不可变状态。
      state.value += 1
    }),
    decrement: create.reducer(state => {
      state.value -= 1
    }),
    // 使用 `PayloadAction` 类型来声明 `action.payload` 的内容
    incrementByAmount: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.value += action.payload
      },
    ),
    // 下面的函数被称为 thunk，允许我们执行异步逻辑。
    // 它可以像普通 action 一样被派发：`dispatch(incrementAsync(10))`。
    // 这会调用 thunk，并将 `dispatch` 函数作为第一个参数传递。
    // 然后可以执行异步代码并派发其他 action。Thunk 通常用于执行异步请求。
    incrementAsync: create.asyncThunk(
      async (amount: number) => {
        const response = await fetchCount(amount)
        // 我们返回的值会成为 `fulfilled` action 的 payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.value += action.payload
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  // 你可以在这里定义选择器。这些选择器接收 slice 状态作为第一个参数。
  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
})

// 每个 case reducer 函数都会生成对应的 action creator。
export const { decrement, increment, incrementByAmount, incrementAsync } =
  counterSlice.actions

// `slice.selectors` 返回的选择器以根状态作为第一个参数。
export const { selectCount, selectStatus } = counterSlice.selectors

// 我们也可以手动编写 thunk，它可以包含同步和异步逻辑。
// 以下是一个根据当前状态有条件派发 action 的示例。
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState())

    if (currentValue % 2 === 1 || currentValue % 2 === -1) {
      dispatch(incrementByAmount(amount))
    }
  }