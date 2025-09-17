// 空白布局
import { Outlet } from "react-router";
import Footer from "../../Footer";
import { css } from '@emotion/css';
import useRouterGuard from "../../../router/useRouterGuard";

function MainLayout() {
  const userInfo = useRouterGuard();

  return (
    <div className={css`
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
      `}>
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