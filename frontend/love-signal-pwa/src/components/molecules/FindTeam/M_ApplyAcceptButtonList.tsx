import { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ApplyAcceptButtonList.module.scss";
import A_ApplyAcceptButton from "../../atoms/MyTeam/A_ApplyAcceptButton";
import A_ApplyRejectButton from "../../atoms/MyTeam/A_ApplyRejectButton";

type propsType = {
  haveOppositeTeam: boolean;
  oppsiteTeamUUID: string;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const M_ApplyAcceptButtonList: React.FC<propsType> = ({
  haveOppositeTeam,
  oppsiteTeamUUID,
  clickBtn,
  setClickBtn,
}) => {
  return (
    <ul className={style.acceptBtnList}>
      <A_ApplyAcceptButton
        haveOppositeTeam={haveOppositeTeam}
        oppsiteTeamUUID={oppsiteTeamUUID}
        clickBtn={clickBtn}
        setClickBtn={setClickBtn}
      />
      <A_ApplyRejectButton
        oppsiteTeamUUID={oppsiteTeamUUID}
        clickBtn={clickBtn}
        setClickBtn={setClickBtn}
      />
    </ul>
  );
};

export default M_ApplyAcceptButtonList;
