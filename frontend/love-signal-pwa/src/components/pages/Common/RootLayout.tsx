import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { alarmModal } from "../../../atom/alarm";

const RootLayout = () => {
  const [, setAlarm] = useRecoilState<boolean>(alarmModal);
  useEffect(() => {
    /* Scrren Resize */
    unitHeightSetHandler();

    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.addEventListener("popstate", closeModal);

    return () => {
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
    };
  }, []);

  const closeModal = () => {
    setAlarm(false);
  };

  const unitHeightSetHandler = () => {
    let vh = window.visualViewport?.height;
    if (!vh) {
      vh = window.innerHeight * 0.01;
    } else {
      vh *= 0.01;
    }
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
