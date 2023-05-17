import { Outlet } from "react-router";
import { useRecoilState } from "recoil";
import { alarmModal } from "../../../atom/alarm";
import { alarmModalAnimation } from "../../../atom/alarm";

import Header from "../../templates/Header/Header";
import Footer from "../../templates/Footer/Footer";
import Modal_portal from "../../UI/Modal/Modal_portal";
import AlarmModal from "../../UI/Modal/Alarm/AlarmModal";

import style from "./styles/ContentLayout.module.scss";
import { useState } from "react";
import Manual_Quest from "../../Manual/Manual_Quest";
import A_ChatProfile_Modal from "../../atoms/Chat/A_ChatProfile_Modal";
import ExitImg from "../../atoms/Common/ExitImg";

let timeout: NodeJS.Timer;

const ContentLayout = () => {
  const [visible, setVisible] = useRecoilState<boolean>(alarmModal);
  const [animation, setAnimation] =
    useRecoilState<boolean>(alarmModalAnimation);
  const [manualVisible, setManualVisible] = useState<boolean>(false);

  const openManual = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setManualVisible(true);
  };

  const openAlert = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setVisible(true);
  };

  const closeManual = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setManualVisible(false), 300);
  };

  const closeAlert = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setVisible(false), 300);
    timeout = setTimeout(() => setManualVisible(false), 300);
  };

  return (
    <>
      <Header onClick={openAlert} openManual={openManual} />
      <div className="inner-main">
        {visible && (
          <Modal_portal>
            <div className={style.container}>
              <div className={style.background} onClick={closeAlert}>
                {" "}
                <ExitImg closeModal={closeAlert} />
              </div>
              {/* <A_ChatProfile_Modal closeModal={closeAlert}>
                알림창ㅇㅇㅇㅇㅇ
              </A_ChatProfile_Modal> */}
              <AlarmModal closeModal={closeAlert}>알림창</AlarmModal>
            </div>
          </Modal_portal>
        )}
        {manualVisible && (
          <Modal_portal>
            <div className={style.container}>
              <div className={style.background} onClick={closeManual}></div>
              <AlarmModal closeModal={closeManual}>
                <Manual_Quest />
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
