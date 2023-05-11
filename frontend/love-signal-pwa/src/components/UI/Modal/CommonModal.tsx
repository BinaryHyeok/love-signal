import { Dispatch, SetStateAction } from "react";
import style from "./CommonModal.module.scss";
import ModalBox from "./ModalBox";
// import Button_Type_A from "../Common/Button_Type_A";
import { validRoomId } from "../../../atom/member";
import { useRecoilState } from "recoil";

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
  const [isErr, setIsErr] = useRecoilState<boolean>(validRoomId);

  const closeModal = () => {
    setIsErr(false);
    setVisible(false);
  };
  return (
    <div className={style.container}>
      <div className={style.background} onClick={closeModal}></div>
      <ModalBox
        width={width}
        height={height}
        closeModal={closeModal}
        children={children}
      />
    </div>
  );
};

export default MemberDetail;
