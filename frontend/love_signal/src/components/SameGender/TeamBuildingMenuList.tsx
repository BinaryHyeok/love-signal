import React from "react";
import style from "./TeamBuildingMenuList.module.scss";
import Button_Type_A from "../UI/Common/Button_Type_A";

const TeamBuildingMenuList = () => {
  const openRoomCodeModalHandler = () => {
    // 룸 코드 모달 여는 로직
  };

  return (
    <div className={style.menuList}>
      <Button_Type_A className={style.menu}>
        <img src="/assets/LIGHTENING.png" />
        빠른 매칭 <img src="/assets/LIGHTENING.png" />
      </Button_Type_A>
      <Button_Type_A className={style.menu}>
        <img src="/assets/SWEET_HOME.png" />
        룸 생성하기
        <img src="/assets/SWEET_HOME.png" />
      </Button_Type_A>
      <Button_Type_A className={style.menu} onClick={openRoomCodeModalHandler}>
        <img src="/assets/KEY.png" />
        룸 검색하기
        <img src="/assets/KEY.png" />
      </Button_Type_A>
    </div>
  );
};

export default TeamBuildingMenuList;
