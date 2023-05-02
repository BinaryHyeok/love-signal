import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/FindTeam.module.scss";
import T_FindTeam from "../../templates/FindTeam/T_FindTeam";
import M_FindTeamDesc from "../../molecules/FindTeam/M_FindTeamDesc";
import O_FindTeamMenu from "../../organisms/O_FindTeamMenu";

const FindTeam = () => {
  const [idx, setIdx] = useRecoilState<number>(footerIdx);

  useEffect(() => {
    setIdx(1);
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
