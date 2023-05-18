import style from "./styles/O_NoChatList.module.scss";

const O_NoChatList = () => {
  return (
    <div className={style.noChat}>
      <span className={style.content}>조회된 채팅이 없습니다</span>
    </div>
  );
};

export default O_NoChatList;
