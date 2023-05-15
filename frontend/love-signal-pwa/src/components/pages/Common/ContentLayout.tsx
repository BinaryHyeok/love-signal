import { Outlet } from "react-router";
import { useRecoilState } from "recoil";
import { alarmModal } from "../../../atom/alarm";
import { alarmModalAnimation } from "../../../atom/alarm";

import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import Modal_portal from "../../UI/Modal/Modal_portal";
import AlarmModal from "../../UI/Modal/Alarm/AlarmModal";

import style from "./styles/ContentLayout.module.scss";

let timeout: NodeJS.Timer;

const ContentLayout = () => {
  const [visible, setVisible] = useRecoilState<boolean>(alarmModal);
  const [animation, setAnimation] =
    useRecoilState<boolean>(alarmModalAnimation);

  const openAlert = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setVisible(true);
  };

  const closeAlert = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setVisible(false), 300);
  };

  return (
    <>
      <Header onClick={openAlert} />
      <div className="inner-main">
        {visible && (
          <Modal_portal>
            <div className={style.container}>
              <div className={style.background} onClick={closeAlert}></div>
              <AlarmModal closeModal={closeAlert}>알림창</AlarmModal>
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
