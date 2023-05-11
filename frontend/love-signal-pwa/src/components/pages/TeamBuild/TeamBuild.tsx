import { useState, useEffect } from "react";
import style from "./styles/TeamBuild.module.scss";
import T_TeamBuildRoom from "../../templates/TeamBuild/T_TeamBuildRoom";
import M_TeamBuildHeader from "../../molecules/TeamBuild/M_TeamBuildHeader";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import O_TeamMemberList from "../../organisms/TeamBuild/O_TeamMemberList";
import { withdrawTeam } from "../../../api/team";
import { useRecoilState } from "recoil";
import {
  imLeader,
  kid,
  myMemberUUID,
  myTeamUUID,
  myatk,
} from "../../../atom/member";
import { useNavigate } from "react-router-dom";
import { inquireMember } from "../../../api/auth";
import A_Clipboard from "../../atoms/TeamBuild/A_Clipboard";
import M_TeamCode from "../../molecules/TeamBuild/M_TeamCode";

const TeamBuild = () => {
  const navigate = useNavigate();
  const DUMMY_DISABLED = false;
  const [memberLength, setMemberLength] = useState<number>(0);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [isLeader, setIsLeader] = useRecoilState<boolean>(imLeader);

  useEffect(() => {
    inquireMember(myUUID, atk, kID)
      .then((res) => {
        setTeamUUID(res.data.body.teamUUID);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //팀 나가기 함수입니다.
  const exitTeam = () => {
    //팀 나가기에 대한 axios가 들어갈 요청입니다.
    withdrawTeam(myUUID, atk, kID)
      .then((res) => {
        setTeamUUID(""); //팀을 나갔으니 TeamUUID없애주기.
        setIsLeader(false);
        navigate("/SameGender", { replace: true });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={style.container}>
      <T_TeamBuildRoom>
        <M_TeamBuildHeader teamCode="나의 팀" />
        <M_TeamCode />
        <O_TeamMemberList setMemberLength={setMemberLength} />
        {/* {isLeader && (
          <Button_Type_A
            width="212px"
            height="52px"
            background={memberLength === 3 ? "#cad9ff" : "#d9d9d9"}
            disabled={memberLength === 3 ? false : true}
            children="팀 생성하기"
          />
        )} */}
        <Button_Type_A
          width="212px"
          height="52px"
          background="#BCC5F0"
          onClick={exitTeam}
          children="팀 나가기"
        />
      </T_TeamBuildRoom>
    </div>
  );
};

export default TeamBuild;
