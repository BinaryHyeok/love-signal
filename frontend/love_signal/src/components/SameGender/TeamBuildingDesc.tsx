import React from "react";
import style from "./TeamBuildingDesc.module.scss";

const TeamBuildingDesc = () => {
  return (
    <p className={style.desc}>
      러브하우스 입주 전,
      <br />
      여러분은 <span className="text-blue">동성팀</span>을 꾸려야 합니다.
      <br />
      <span className="text-red">빠른 매칭</span> 선택 시,{" "}
      <span className="text-red">자동</span>으로 팀이 꾸려집니다.
      <br />룸 생성시 생성한 사람이 <span className="text-blue">팀장</span>이
      됩니다.
      <br />
      팀장은 <span className="text-red">이성팀 초대 권한</span>이 주어집니다.
      <br />
      룸은 <span className="text-red">코드</span>를{" "}
      <span className="text-red">검색</span>하여 입장할 수 도 있습니다.
    </p>
  );
};

export default TeamBuildingDesc;
