import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/FindTeam.module.scss";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/FindTeam/O_FindTeamMenu";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";
import { teamBuildState } from "../../../atom/member";
import MatchTeam from "../../templates/FindTeam/MatchTeam";

const FindTeam = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  useEffect(() => {
    setIdx(1);
  }, []);
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
