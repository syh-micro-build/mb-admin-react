import Footer from "../../Footer";
import moduleStyles from "../layout.module.css";
import { useRouterGuard } from "../../../router";

const { loginLayoutContainer } = moduleStyles;
function LoginLayout({ children }: { children: React.ReactNode }) {
  // 使用路由守卫
  useRouterGuard();

  return (
    <div className={loginLayoutContainer}>
      {children}
      <Footer />
    </div>
  );
}

export default LoginLayout;