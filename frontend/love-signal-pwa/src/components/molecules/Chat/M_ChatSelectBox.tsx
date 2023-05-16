import React from "react";
import style from "./styles/M_ChatSelectBox.module.scss";

type PropsType = {
  nickname: string;
  profile: string;
  selectHandler?: (param: string) => void;
  isSelected?: boolean;
  isSelect?: boolean;
};

const M_ChatSelectBox: React.FC<PropsType> = ({
  nickname,
  profile,
  selectHandler,
  isSelected,
  isSelect,
}) => {
  console.log(nickname, isSelected);
  const selectOne = () => {
    if (!isSelected && selectHandler) {
      selectHandler(nickname);
    }
  };

  return (
    <li className={style.selectOneBox}>
      <div className={style.imgBox}>
        <img src={profile} className={style.profileImg} />
      </div>
      {isSelect && (
        <button
          className={`${style.selectBtn} ${isSelected ? style.selected : ""}`}
          onClick={selectOne}
        >
          <img
            src={`${process.env.REACT_APP_ASSETS_DIR}/heart-with-arrow.png`}
          />
        </button>
      )}
    </li>
  );
};

export default M_ChatSelectBox;
