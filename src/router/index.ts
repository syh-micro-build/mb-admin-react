import { createBrowserRouter, useLocation, useNavigate } from 'react-router';
import { lazy, useEffect } from 'react';
import { useAppSelector } from "../stores";
import { MainLayout } from '../components/Layout';

// 公开路由白名单（无需登录即可访问）
const publicRoutes = ['/404'];

// 懒加载页面组件
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const About = lazy(() => import('../pages/About'));

const constantRoutes = [
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
    ],
  },
];

const router = createBrowserRouter(constantRoutes);

/**
 * 路由守卫组件
 * @description 此组件可以用于实现全局路由守卫逻辑，例如权限校验、重定向等。
 * @returns 返回登录信息，便于组件引用时，判断如果没有登录就不要展示具体内容
 */
export const useRouterGuard = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.auth.userInfo);

  useEffect(() => {
    // 1. 检查是否为公开路由
    if (publicRoutes.includes(pathname)) {
      return;
    }

    // 2. 未登录用户访问受保护路由：重定向到登录页
    if (!userInfo && pathname !== '/login') {
      navigate('/login', { replace: true });
    }

    // 3. 登录用户访问登录页：重定向到首页
    if (userInfo && pathname === '/login') {
      navigate('/', { replace: true });
    }

  }, [pathname, userInfo, navigate]);

  return userInfo; // 返回登录信息，便于组件引用时，判断如果没有登录就不要展示具体内容
}

export default router;
