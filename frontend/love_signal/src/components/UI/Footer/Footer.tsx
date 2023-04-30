import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { footerIdx } from "../../../atoms/footer";
import { useRecoilState } from "recoil";
import style from "./Fotter.module.scss";

const Footer = () => {
  const navigate = useNavigate();

  const [idx, setIdx] = useRecoilState<number>(footerIdx);

  const [color, setColor] = useState<string[]>([
    "black",
    "black",
    "black",
    "black",
  ]);

  let [clickNav, setClickNav] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    setClickNav(falseArr.map((_, index) => index === idx));
    setColor(color.map((_, index) => (index === idx ? "color" : "black")));
  }, []);

  const falseArr = [false, false, false, false];
  const setNav = (id: number, path: string) => {
    setClickNav(falseArr.map((_, index) => index === id));
    setColor(color.map((_, index) => (index === id ? "color" : "black")));
    navigate(path);
  };

  const isClickNav = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    const navid: number = +target.id;
    setIdx(navid);

    if (navid === 0) {
      setNav(0, "/othergender");
    } else if (navid === 1) {
      setNav(1, "/samegender");
    } else if (navid === 2) {
      setNav(2, "/chat");
    } else if (navid === 3) {
      setNav(3, "/mypage");
    }
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
