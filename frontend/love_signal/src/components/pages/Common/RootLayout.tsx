import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      console.log("prev = ", viewportHeight, " next = ", window.innerHeight);
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <main className="common-bg" style={{ height: viewportHeight }}>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
