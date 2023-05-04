import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import { myTeamUUID } from "../../../atom/member";
import style from "./styles/FindTeam.module.scss";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/FindTeam/O_FindTeamMenu";

const FindTeam = () => {
  const navigate = useNavigate();
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [teamUUID] = useRecoilState<string>(myTeamUUID);
  useEffect(() => {
    setIdx(1);
    //내가 만약 teamUUID를 가지고있다면 그 MyTeam으로 가야한다.
    if (teamUUID !== "") {
      navigate("/Samegender/Myteam");
    }
  }, []);

  return (
    <div className={`${style.container}`}>
      <T_FindTeam>
        <M_FindTeamDesc />
        <O_FindTeamMenu />
      </T_FindTeam>
    </div>
  );
};

export default FindTeam;
