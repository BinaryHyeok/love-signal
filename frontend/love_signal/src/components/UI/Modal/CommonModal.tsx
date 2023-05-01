import { Dispatch, SetStateAction } from "react";
import style from "./CommonModal.module.scss";
import Button_Type_A from "../Common/Button_Type_A";

type propsType = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  width: string;
  height: string;
  children: any;
};

const MemberDetail: React.FC<propsType> = ({
  setVisible,
  visible,
  width,
  height,
  children,
}) => {
  const closeModal = () => {
    setVisible(!visible);
  };
  return (
    <div className={style.container}>
      <div className={style.background} onClick={closeModal}></div>
      <div
        className={style.modal}
        style={{
          width: `${width}`,
          height: `${height}`,
        }}
      >
        <img
          src="/assets/exit.png"
          className={style.exit}
          alt="나가기"
          onClick={closeModal}
        />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default MemberDetail;
