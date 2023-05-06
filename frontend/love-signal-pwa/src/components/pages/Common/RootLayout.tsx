import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  useEffect(() => {
    /* Scrren Resize */
    unitHeightSetHandler();

    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);

    return () => {
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
    };
  }, []);

  const unitHeightSetHandler = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  return (
    <>
      <main className="common-bg">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
