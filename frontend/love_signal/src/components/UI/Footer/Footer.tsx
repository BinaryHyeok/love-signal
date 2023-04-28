import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Footer.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  const [color, setColor] = useState<string[]>([
    "black",
    "black",
    "black",
    "black",
  ]);

  const [clickNav, setClickNav] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const isClickNav = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    const navid: number = +target.id;
    if (navid === 0) {
      clickNav[0] = true;
      color[0] = "color";
      clickNav[1] = false;
      color[1] = "black";
      clickNav[2] = false;
      color[2] = "black";
      clickNav[3] = false;
      color[3] = "black";
      navigate(`/othergender`);
    } else if (navid === 1) {
      clickNav[0] = false;
      color[0] = "black";
      clickNav[1] = true;
      color[1] = "color";
      clickNav[2] = false;
      color[2] = "black";
      clickNav[3] = false;
      color[3] = "black";
      navigate(`/samegender`);
    } else if (navid === 2) {
      clickNav[0] = false;
      color[0] = "black";
      clickNav[1] = false;
      color[1] = "black";
      clickNav[2] = true;
      color[2] = "color";
      clickNav[3] = false;
      color[3] = "black";
      navigate(`/chat`);
    } else if (navid === 3) {
      clickNav[0] = false;
      color[0] = "black";
      clickNav[1] = false;
      color[1] = "black";
      clickNav[2] = false;
      color[2] = "black";
      clickNav[3] = true;
      color[3] = "color";
      navigate(`/mypage`);
    }
    setClickNav([...clickNav]);
  };

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.navbar}>
          <img
            id="0"
            src={`/assets/othergender_${color[0]}.png`}
            alt=""
            onClick={isClickNav}
            className={style.nav1}
          />
        </div>
        <div className={style.navbar}>
          <img
            id="1"
            src={`/assets/group_${color[1]}.png`}
            alt=""
            onClick={isClickNav}
            className={style.nav1}
          />
        </div>
        <div className={style.navbar}>
          <img
            id="2"
            src={`/assets/chat_${color[2]}.png`}
            alt=""
            onClick={isClickNav}
            className={style.nav2}
          />
        </div>
        <div className={style.navbar}>
          <img
            id="3"
            src={`assets/mypage_${color[3]}.png`}
            alt=""
            onClick={isClickNav}
            className={style.nav2}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
