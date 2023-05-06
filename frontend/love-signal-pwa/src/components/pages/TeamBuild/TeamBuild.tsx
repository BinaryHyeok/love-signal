import style from "./styles/TeamBuild.module.scss";
import T_TeamBuildRoom from "../../templates/TeamBuild/T_TeamBuildRoom";
import M_TeamBuildHeader from "../../molecules/TeamBuild/M_TeamBuildHeader";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import O_TeamMemberList from "../../organisms/TeamBuild/O_TeamMemberList";

const TeamBuild = () => {
  const DUMMY_DISABLED = false;

  return (
    <div className={style.container}>
      <T_TeamBuildRoom>
        <M_TeamBuildHeader teamCode="B309" />
        {/* <RoomUserList /> */}
        <O_TeamMemberList />
        <Button_Type_A
          width="212px"
          height="52px"
          background={DUMMY_DISABLED ? "#d9d9d9" : "#cad9ff"}
          // disabled={DUMMY_DISABLED}
        >
          팀 생성하기
        </Button_Type_A>
      </T_TeamBuildRoom>
    </div>
  );
};

export default TeamBuild;
