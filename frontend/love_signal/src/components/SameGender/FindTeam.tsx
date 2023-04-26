import Header from "../UI/Header/Header";
import style from "./FindTeam.module.scss";

const FindTeam = () => {
  return (
    <div className={`${style.container} diagonal-gradient`}>
      <Header />
      <p className={style.pageDesc}>
        러브하우스 입주 전,
        <br />
        여러분은 동성팀을 꾸려야 합니다.
        <br />
        빠른 매칭 선택 시, 자동으로 팀이 꾸려집니다.
        <br />
        룸 생성시 생성한 사람이 팀장이 됩니다.
        <br />
        팀장은 <span>이성팀 초대 권한</span>이 주어집니다.
        <br />
        룸은 코드를 검색하여 입장할 수 도 있습니다.
      </p>
      동성 팀 찾는 페이지 입니다. (빠른 매칭, 방만들기, 방 번호입력이 있는
      페이지)
    </div>
  );
};

export default FindTeam;
