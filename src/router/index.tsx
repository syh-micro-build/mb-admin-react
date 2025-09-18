import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router';
import { lazy, useMemo } from 'react';
import { useAppSelector } from "../stores";
import { RoleInfoItem } from '../../types/auth';

// 懒加载页面组件
const MenuLayout = lazy(() => import('../components/Layout/component/MenuLayout'));
const BlankLayout = lazy(() => import('../components/Layout/component/BlankLayout'));
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Welcome = lazy(() => import('../pages/Welcome'));

const AppRouter = () => {

  const roleInfo = useAppSelector((state) => state.auth.roleInfo);

  const router = useMemo(() => {

    const constantRoutes: RouteObject[] = [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/",
        Component: MenuLayout,
        children: [
          { index: true, Component: Home },
          { path: "welcome", Component: Welcome },
        ],
      },
    ];

    const routes = roleInfo.length ? constantRoutes.map((item) => {
      if (item.path === '/') {
        return {
          ...item,
          children: [
            ...(item.children || []),
            ...getRoleRoutes(roleInfo)
          ]
        }
      }
      return item;
    }) : constantRoutes;
    // TODO: 浏览器触发返回时，路由会重新计算，导致路由组件重新加载，并陷入死循环
    console.log('动态路由', routes);


    return createBrowserRouter(routes as RouteObject[]);
  }, [roleInfo]);

  return <RouterProvider router={router} />
}

function getRoleRoutes(roleInfo: RoleInfoItem[]) {
  return roleInfo.map((item) => {
    const filteredItem: RouteObject = {
      path: item.path,
      ...(item.component !== '#' ? {
        Component: lazy(() => import(`../pages/${item.component.replace('pages/', '')}/index.tsx`)),
      } : {
        Component: BlankLayout,
      }),
    };

    if (item.children && Array.isArray(item.children)) {
      filteredItem.children = getRoleRoutes(item.children);
    }

    return filteredItem;
  });
}

export default AppRouter;
