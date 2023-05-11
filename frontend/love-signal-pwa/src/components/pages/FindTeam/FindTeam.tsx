import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import { kid, myTeamUUID, myatk } from "../../../atom/member";
import style from "./styles/FindTeam.module.scss";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/FindTeam/O_FindTeamMenu";
import { getMyTeam, withdrawTeam } from "../../../api/team";
import { myMemberUUID } from "../../../atom/member";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";

const FindTeam = () => {
  const navigate = useNavigate();
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [teamUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  useEffect(() => {
    setIdx(1);
    //내가 만약 teamUUID를 가지고있다면 그 MyTeam으로 가야한다.
    if (teamUUID !== null || teamUUID !== "") {
      getMyTeam(teamUUID, atk, kID).then((res) => {
        //내가 상대팀을 가지고 있는지를 파악.
        if (
          !res.data.body.haveMeetingTeam &&
          res.data.body.members.length !== 3
        ) {
          navigate("/Samegender/build");
        } else {
          navigate("/Samegender/myTeam");
        }
      });
    } else {
      setTeamUUID("");
    }
  }, []);

  const [myUUID] = useRecoilState<string>(myMemberUUID);

  return (
    <motion.div
      variants={contentVariants}
      initial="hidden"
      animate="visible"
      // exit="exit"
      className={`${style.container}`}
    >
      <TeamBuildFilter>
        <T_FindTeam>
          <M_FindTeamDesc />
          <O_FindTeamMenu />
        </T_FindTeam>
      </TeamBuildFilter>
    </motion.div>
  );
};

export default FindTeam;
