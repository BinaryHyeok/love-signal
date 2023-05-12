import { Dispatch, SetStateAction, useState } from "react";
import style from "./CommonModal.module.scss";
import ModalBox from "./ModalBox";
// import Button_Type_A from "../Common/Button_Type_A";
import { validRoomId } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

type propsType = {
  timeout: any;
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  width: string;
  height: string;
  children: any;
};

const MemberDetail: React.FC<propsType> = ({
  timeout,
  animation,
  setAnimation,
  setVisible,
  visible,
  width,
  height,
  children,
}) => {
  const [isErr, setIsErr] = useRecoilState<boolean>(validRoomId);

  const closeModal = () => {
    console.log(animation);
    console.log(visible);
    setIsErr(false);
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => {
      setVisible(false);
    }, 500);
    console.log(animation);
    console.log(visible);
  };
  return (
    <div className={style.container}>
      <motion.div
        className={`${style.background} ${
          animation ? `${style.disappear}` : ""
        }`}
        onClick={closeModal}
      ></motion.div>
      <ModalBox
        animation={animation}
        visible={visible}
        width={width}
        height={height}
        closeModal={closeModal}
        children={children}
      />
    </div>
  );
};

export default MemberDetail;
