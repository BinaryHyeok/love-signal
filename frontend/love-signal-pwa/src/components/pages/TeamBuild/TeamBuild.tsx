import { useState, useEffect } from "react";
import style from "./styles/TeamBuild.module.scss";
import T_TeamBuildRoom from "../../templates/TeamBuild/T_TeamBuildRoom";
import M_TeamBuildHeader from "../../molecules/TeamBuild/M_TeamBuildHeader";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
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
import M_TeamCode from "../../molecules/TeamBuild/M_TeamCode";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import A_TextHighlight_Blink from "../../atoms/Common/A_TextHighlight_Blink";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

const TeamBuild = () => {
  const navigate = useNavigate();
  const [memberLength, setMemberLength] = useState<number>(0);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [isLeader, setIsLeader] = useRecoilState<boolean>(imLeader);

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
    <ATKFilter>
      <GetMyInfo>
        <TeamBuildFilter>
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            // exit="exit"
            className={style.container}
          >
            <T_TeamBuildRoom>
              <M_TeamBuildHeader teamCode="나의 팀" />
              <M_TeamCode />
              <O_TeamMemberList setMemberLength={setMemberLength} />
              <Button_Type_A
                width="90%"
                height="40px"
                background="#BCC5F0"
                onClick={exitTeam}
                children="팀 나가기"
              />
              <br />
              <A_TextHighlight_Blink color="blue" fontSize="0.8rem">
                * 주의 : 팀 나가기를 누르면 방이 터집니다
              </A_TextHighlight_Blink>
            </T_TeamBuildRoom>
          </motion.div>
        </TeamBuildFilter>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default TeamBuild;
