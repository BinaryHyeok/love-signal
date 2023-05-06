import Header from "../../UI/Header/Header";
import { Outlet } from "react-router";
import Footer from "../../UI/Footer/Footer";

const ContentLayout = () => {
  return (
    <>
      <Header />
      <div className="inner-main">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ContentLayout;
