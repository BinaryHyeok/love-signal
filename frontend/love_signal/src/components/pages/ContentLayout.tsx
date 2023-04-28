import React from "react";
import Header from "../UI/Header/Header";
import { Outlet } from "react-router";

const ContentLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ContentLayout;
