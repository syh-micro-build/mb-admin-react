import { defaultHttpConfig } from '../src/axios/config'

const { SUCCESS_CODE } = defaultHttpConfig

const timeout = 1000

const adminList = [
  {
    path: '/dashboard',
    component: '#',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    title: '首页',
    icon: 'SmileFilled',
    children: [
      {
        path: 'analysis',
        component: 'pages/Home',
        name: 'Analysis',
        title: '分析页',
      },
    ]
  },
  {
    path: '/authorization',
    component: '#',
    redirect: '/authorization/user',
    name: 'Authorization',
    title: '权限管理',
    icon: 'SmileFilled',
    children: [
      {
        path: 'user',
        component: 'pages/About',
        name: 'User',
        title: '用户管理'
      },
    ]
  }
]

const testList: string[] = ['/dashboard', '/dashboard/analysis']

const List: any[] = []

const roleNames = ['超级管理员', '管理员', '普通用户', '游客']
const menus = [
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      id: 1,
      title: '首页',
      icon: 'SmileFilled',
      children: [
        {
          path: 'analysis',
          component: 'pages/Home',
          name: 'Analysis',
          id: 2,
          title: '分析页',
        }
      ]
    }
  ],
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      id: 1,
      title: '首页',
      icon: 'SmileFilled',
      children: [
        {
          path: 'analysis',
          component: 'pages/Home',
          name: 'Analysis',
          id: 2,
          title: '分析页',
        }
      ]
    }
  ]
]

for (let i = 0; i < 4; i++) {
  List.push({
      id: i,
      roleName: roleNames[i],
      role: roleNames[i],
      createTime: new Date().toLocaleString(),
      remark: '1234567890',
      menu: menus[i]
    })
}

export default [
  // 列表接口
  {
    url: '/mock/role/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: adminList
      }
    }
  },
  {
    url: '/mock/role/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: List,
          total: 4
        }
      }
    }
  },
  // 列表接口
  {
    url: '/mock/role/list2',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: testList
      }
    }
  }
]
