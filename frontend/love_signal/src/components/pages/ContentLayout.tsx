import React from "react";
import Header from "../UI/Header/Header";
import { Outlet } from "react-router";

const ContentLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ContentLayout;
