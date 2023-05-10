import { Outlet } from "react-router";
import { useRecoilState } from "recoil";
import { alarmModal } from "../../../atom/alarm";

import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import Modal_portal from "../../UI/Modal/Modal_portal";
import AlarmModal from "../../UI/Modal/AlarmModal";

import style from "./styles/ContentLayout.module.scss";

const ContentLayout = () => {
  const [visible, setVisible] = useRecoilState<boolean>(alarmModal);

  const openAlert = () => {
    setVisible(!visible);
    console.log(visible);
  };

  const closeAlert = () => {
    setVisible(false);
    console.log(visible);
  };

  return (
    <>
      <Header onClick={openAlert} />
      <div className="inner-main">
        {visible && (
          <Modal_portal>
            <div className={style.container}>
              <div className={style.background} onClick={closeAlert}></div>
              <AlarmModal open={visible} closeModal={closeAlert}>
                ddsfsdf
              </AlarmModal>
            </div>
          </Modal_portal>
        )}
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ContentLayout;
