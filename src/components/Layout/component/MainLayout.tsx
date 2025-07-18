import { Outlet } from "react-router";
import Footer from "../../Footer";
import moduleStyles from "../layout.module.css";
import { useRouterGuard } from "../../../router";

const { loginLayoutContainer } = moduleStyles;
function MainLayout() {
  const userInfo = useRouterGuard();

  return (
    <div className={loginLayoutContainer}>
      {userInfo && (
        <>
          <div style={{ height: "100%" }}>
            <Outlet />
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default MainLayout;