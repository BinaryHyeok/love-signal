import React from "react";
import style from "./styles/A_ChatPeopleImage.module.scss";

type PropsType = {
  imgs: (string | undefined)[];
};

const idxName = ["", "one", "two", "three", "fill"];

const A_ChatPeopleImage: React.FC<PropsType> = ({ imgs }) => {
  let name = imgs.length > 4 ? idxName[4] : idxName[imgs.length];
  return (
    <div className={style.imgBox}>
      {imgs.map((item, idx) => {
        if (idx < 4)
          return (
            <div className={`${style.imgCover} ${style[name]}`} key={idx}>
              <img src={item} />
            </div>
          );
      })}
    </div>
  );
};

export default A_ChatPeopleImage;
