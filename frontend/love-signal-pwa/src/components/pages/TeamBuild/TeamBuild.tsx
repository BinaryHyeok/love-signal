import { useState, useEffect } from "react";
import style from "./styles/TeamBuild.module.scss";
import T_TeamBuildRoom from "../../templates/TeamBuild/T_TeamBuildRoom";
import M_TeamBuildHeader from "../../molecules/TeamBuild/M_TeamBuildHeader";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import O_TeamMemberList from "../../organisms/TeamBuild/O_TeamMemberList";
import { getMyTeam, withdrawTeam } from "../../../api/team";
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
import { inquireMember } from "../../../api/auth";
import Ground from "../../UI/Three/Ground";

let timer: NodeJS.Timer;

const TeamBuild = () => {
  const navigate = useNavigate();
  const [memberLength, setMemberLength] = useState<number>(0);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [myTUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [, setIsLeader] = useRecoilState<boolean>(imLeader);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    timer = setInterval(() => {
      setIsLoading(true);
      getMyTeam(myTUUID, atk, kID).then((res) => {
        if (res.data.body.members.length === 3) {
          navigate("/SameGender/MyTeam", { replace: true });
        }
      });
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [atk, myTUUID]);
  //팀 나가기 함수입니다.
  const exitTeam = () => {
    //팀 나가기에 대한 axios가 들어갈 요청입니다.
    withdrawTeam(myUUID, atk, kID)
      .then(() => {
        setTeamUUID(""); //팀을 나갔으니 TeamUUID없애주기.
        setIsLeader(false);
        navigate("/SameGender", { replace: true });
      })
      .catch(() => {});
  };
  if (isLoading) {
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
                <O_TeamMemberList
                  setMemberLength={setMemberLength}
                  setIsLoading={setIsLoading}
                />
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
  } else {
    return (
      <>
        <Ground />
      </>
    );
  }
};

export default TeamBuild;
