import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <main className="common-bg">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
