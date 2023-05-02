import React from "react";
import style from "./A_FooterIcon.module.scss";

type propsType = {
  idx: string;
  color: string;
  address: string;
  isClickNav: (e: React.MouseEvent<HTMLElement>) => void;
  size: string;
};

const FooterIcon: React.FC<propsType> = ({
  idx,
  color,
  address,
  isClickNav,
  size,
}) => {
  //스타일 변경을 위해서 number로 변경시켜준 변수 사용.
  return (
    <div className={style.navbar}>
      <img
        id={idx}
        src={`/assets/${address}_${color}.png`}
        alt="네비바 아이콘"
        onClick={isClickNav}
        className={style[`nav${size}`]}
      />
    </div>
  );
};

export default FooterIcon;
