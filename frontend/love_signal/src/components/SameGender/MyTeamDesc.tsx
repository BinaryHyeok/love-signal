import style from "./MyTeamDesc.module.scss";

const MyTeamDesc = () => {
  return (
    <p className={style.desc}>
      이곳에서는 <span className="text-blue">팀원 정보</span>와<br />
      <span className="text-red">신청받은 초대 목록</span>을 관리할 수 있습니다.
    </p>
  );
};

export default MyTeamDesc;
