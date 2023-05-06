import style from "./styles/A_ChatSendBtn.module.scss";

const A_ChatSendBtn = () => {
  return (
    <button className={style.sendBtn}>
      <img src="/assets/paper-airplane.png" />
    </button>
  );
};

export default A_ChatSendBtn;
