import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import style from "./styles/M_FindTeamDesc.module.scss";

const M_FindTeamDesc = () => {
  return (
    <p className={style.desc}>
      러브하우스 입주 전,
      <br />
      여러분은 <A_TextHighlight color="blue">동성팀</A_TextHighlight> 을 꾸려야
      합니다.
      <br />
      <A_TextHighlight color="red">빠른 매칭</A_TextHighlight> 선택 시,{" "}
      <A_TextHighlight color="red">자동</A_TextHighlight>으로 팀이 꾸려집니다.
      <br />룸 생성시 생성한 사람이{" "}
      <A_TextHighlight color="blue">팀장</A_TextHighlight>이 됩니다.
      <br />
      팀장은 <A_TextHighlight color="red">이성팀 초대 권한</A_TextHighlight>이
      주어집니다.
      <br />
      룸은 <A_TextHighlight color="red">코드</A_TextHighlight>를{" "}
      <A_TextHighlight color="red">검색</A_TextHighlight>하여 입장할 수 도
      있습니다.
    </p>
  );
};

export default M_FindTeamDesc;
