import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../atom/footer";
import Footer from "../UI/Footer/Footer";
import Header from "../UI/Header/Header";
import style from "./FindTeam.module.scss";
import TeamBuildingDesc from "./TeamBuildingDesc";
import TeamBuildingMenu from "./TeamBuildingMenu";

const FindTeam = () => {
  const [idx, setIdx] = useRecoilState<number>(footerIdx);

  useEffect(() => {
    setIdx(1);
  }, []);

  return (
    <div className={`${style.container}`}>
      <Header />
      <TeamBuildingDesc />
      <TeamBuildingMenu />
      <Footer />
    </div>
  );
};

export default FindTeam;
