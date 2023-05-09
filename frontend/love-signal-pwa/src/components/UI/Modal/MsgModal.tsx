import style from "./MsgModal.module.scss";

type propsType = {
  msg: string;
};

const MsgModal: React.FC<propsType> = ({ msg }) => {
  return <div className={style.modalContent}>{msg}</div>;
};

export default MsgModal;
