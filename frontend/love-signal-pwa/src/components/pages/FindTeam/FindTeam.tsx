import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import style from "./styles/FindTeam.module.scss";
import { footerIdx } from "../../../atom/footer";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/FindTeam/O_FindTeamMenu";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";
import { kid, myMemberUUID, myatk, teamBuildState } from "../../../atom/member";
import MatchTeam from "../../templates/FindTeam/MatchTeam";
import { inquireMember } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

let timer: NodeJS.Timer;

const FindTeam = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [atk] = useRecoilState<string>(myatk);
  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [kID] = useRecoilState<string>(kid);
  const [matchStatus, setMatchStatus] = useRecoilState<boolean>(teamBuildState);

  useEffect(() => {
    console.log(matchStatus);

    setIdx(1);
    if (matchStatus) {
      timer = setInterval(() => {
        inquireMember(UUID, atk, kID).then((res) => {
          if (!res.data.body.matchingStatus) {
            setMatchStatus(false);
            navigate("/SameGender/MyTeam");
          }
        });
      }, 2000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [atk, matchStatus]);

  const [myTeamBuildState] = useRecoilState<boolean>(teamBuildState);

  return (
    <ATKFilter>
      <GetMyInfo>
        <TeamBuildFilter>
          {myTeamBuildState ? (
            <>
              <MatchTeam />
            </>
          ) : (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              // exit="exit"
              className={`${style.container}`}
            >
              <T_FindTeam>
                <M_FindTeamDesc />
                <O_FindTeamMenu />
              </T_FindTeam>
            </motion.div>
          )}
        </TeamBuildFilter>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default FindTeam;
