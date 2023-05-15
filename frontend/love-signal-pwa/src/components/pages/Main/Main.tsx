import style from "./styles/Main.module.scss";
import A_MainImg from "../../atoms/Main/A_MainImg";
import A_MainModal from "../../UI/Modal/Main/A_MainModal";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import { useState, useEffect } from "react";

let timeout: NodeJS.Timer;

const Main = () => {
  useEffect(() => {
    const local = window.location.hostname;
    console.log(local);
  }, []);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const openLogin = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setIsVisible(true);
  };

  const closeLogin = () => {
    setAnimation(true);
    timeout = setTimeout(() => {
      setIsVisible(false);
    }, 650);
  };
  return (
    <>
      <div className={`${style.MainContainer} diagonal-gradient`}>
        <div>
          <A_MainImg />
          <div className={style.startBtn}>
            <Button_Type_A width="80%" height="40px" onClick={openLogin}>
              {" "}
              시작하기
            </Button_Type_A>
          </div>
        </div>
        {isVisible && (
          <div className={style.modalContainer}>
            <div className={style.background} onClick={closeLogin}></div>
            <A_MainModal animation={animation} />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
