import { chat } from "../../../types/chat";
import style from "./styles/A_ChatItemPreview.module.scss";

type PropsType = {
  lastChat: chat;
};

const A_ChatItemPreview: React.FC<PropsType> = ({ lastChat }) => {
  return (
    <div className={style.previewBox}>
      <p className={style.lastMsg}>{lastChat.content}</p>
    </div>
  );
};

export default A_ChatItemPreview;
