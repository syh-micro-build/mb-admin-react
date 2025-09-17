// 登录页布局
import Footer from "../../Footer";
import { css } from '@emotion/css';
import useRouterGuard from "../../../router/useRouterGuard";
import loginBg from '../../../assets/login-bg.png';
function LoginLayout({ children }: { children: React.ReactNode }) {
  // 使用路由守卫
  useRouterGuard();

  return (
    <div className={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        background-image: url(${loginBg});
        background-size: 100% 100%;
        >div {
          background: none;
        }
      `}>
      {children}
      <Footer />
    </div>
  );
}

export default LoginLayout;