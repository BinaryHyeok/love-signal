import style from "./styles/A_ChatSendBtn.module.scss";

type PropsType = {
  isDisabled: boolean;
};

const A_ChatSendBtn: React.FC<PropsType> = ({ isDisabled }) => {
  return (
    <button className={style.sendBtn}>
      <img
        className={isDisabled ? style.disabled : ""}
        src={`${process.env.REACT_APP_ASSETS_DIR}/paper-airplane.png`}
      />
    </button>
  );
};

export default A_ChatSendBtn;
