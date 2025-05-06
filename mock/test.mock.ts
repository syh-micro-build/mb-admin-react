export default [
  // 列表接口
  {
    url: '/mock/test',
    method: 'get',
    response: () => {

      return {
        code: 200,
        data: {
          text: 'Request Success!',
        }
      }
    }
  },
]