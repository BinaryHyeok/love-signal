import React from "react";
import style from "./styles/M_MyTeamDesc.module.scss";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";

const M_MyTeamDesc = () => {
  return (
    <p className={style.desc}>
      이곳에서는 <A_TextHighlight color="blue">팀원 정보</A_TextHighlight>와
      <br />
      <A_TextHighlight color="red">신청받은 초대 목록</A_TextHighlight>을 관리할
      수 있습니다.
    </p>
  );
};

export default M_MyTeamDesc;
