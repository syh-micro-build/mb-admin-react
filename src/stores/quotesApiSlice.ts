// 需要使用 React 专用入口来导入 `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Quote = {
  id: number
  quote: string
  author: string
}

type QuotesApiResponse = {
  quotes: Quote[]
  total: number
  skip: number
  limit: number
}

// 使用基础 URL 和预期的端点定义一个服务
export const quotesApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/quotes" }),
  reducerPath: "quotesApi",
  // tagTypes 用于缓存和失效处理。
  tagTypes: ["Quotes"],
  endpoints: build => ({
    // 为返回类型（这里是 `QuotesApiResponse`）和预期的查询参数提供泛型。
    // 如果没有参数，参数类型用 `void`。
    getQuotes: build.query<QuotesApiResponse, number>({
      query: (limit = 10) => `?limit=${limit.toString()}`,
      // `providesTags` 决定了查询返回的缓存数据附带哪个 'tag'。
      providesTags: (_result, _error, id) => [{ type: "Quotes", id }],
    }),
  }),
})

// RTK-Query 会自动生成 hooks
// 等同于 `quotesApiSlice.endpoints.getQuotes.useQuery`
export const { useGetQuotesQuery } = quotesApiSlice