import React from "react";
import style from "./FooterIcon.module.scss";

type propsType = {
  idx: string;
  color: string;
  address: string;
  isClickNav: (e: React.MouseEvent<HTMLElement>) => void;
};

const FooterIcon: React.FC<propsType> = ({
  idx,
  color,
  address,
  isClickNav,
}) => {
  //스타일 변경을 위해서 number로 변경시켜준 변수 사용.
  const num: number = +idx;
  return (
    <>
      <img
        id={idx}
        src={`/assets/${address}_${color}.png`}
        alt="네비바 아이콘"
        onClick={isClickNav}
        className={num < 2 ? style.nav1 : style.nav2}
      />
    </>
  );
};

export default FooterIcon;
