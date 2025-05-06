import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// `buildCreateSlice` 允许我们创建带有异步 thunk 的 slice。
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
