import style from "./Fotter.module.scss";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <img src="/assets/othergender_color.png" />
        <img src="/assets/othergender_black.png" />
      </div>
      <div className={style.navbar}>
        <img src="/assets/group_color.png" />
        <img src="/assets/group_black.png" />
      </div>
      <div className={style.navbar}>
        <img src="/assets/chat_color.png" />
        <img src="/assets/chat_black.png" />
      </div>
      <div className={style.navbar}>
        <img src="assets/mypage_color.png" />
        <img src="assets/mypage_black.png" />
      </div>
    </div>
  );
};

export default Footer;
