import Footer from "../UI/Footer/Footer";
import Header from "../UI/Header/Header";
import style from "./Chat.module.scss";

const Chat = () => {
  return (
    <div className={style.container}>
      <Header />
      <Footer />
    </div>
  );
};

export default Chat;
