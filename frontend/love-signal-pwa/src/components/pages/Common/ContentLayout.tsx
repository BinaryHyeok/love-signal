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
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";

let timeout: NodeJS.Timer;

const ContentLayout = () => {
  const [visible, setVisible] = useRecoilState<boolean>(alarmModal);
  const [animation, setAnimation] =
    useRecoilState<boolean>(alarmModalAnimation);
  const [manualVisible, setManualVisible] = useState<boolean>(false);
  const [isSurveySubmitted, setIsSurveySubmitted] = useState<boolean>(false);

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
              <div className={style.background} onClick={closeAlert}></div>
              <AlarmModal closeModal={closeAlert}>
                {!isSurveySubmitted ? (
                  <>
                    <h3 className={style.title}>
                      <A_TextHighlight color="red">러브시그널</A_TextHighlight>{" "}
                      설문
                    </h3>
                    <iframe
                      src="https://docs.google.com/forms/d/e/1FAIpQLSdTMLix7nTcSyDb6rXm1Qa6XPEtFbELbleunrtLot7bhJtoxQ/viewform?embedded=true"
                      className={style.iframe}
                    >
                      로드 중…
                    </iframe>
                  </>
                ) : (
                  <p>"설문 제출이 완료되었습니다."</p>
                )}
              </AlarmModal>
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
