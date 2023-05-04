import style from "./styles/M_ApplyAcceptButtonList.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import A_ApplyAcceptButton from "../../atoms/MyTeam/A_ApplyAcceptButton";
import A_ApplyRejectButton from "../../atoms/MyTeam/A_ApplyRejectButton";

type propsType = {
  isLeader: boolean;
  haveOppositeTeam: boolean;
  oppsiteTeamUUID: string;
};

const M_ApplyAcceptButtonList: React.FC<propsType> = ({
  isLeader,
  haveOppositeTeam,
  oppsiteTeamUUID,
}) => {
  return (
    <ul className={style.acceptBtnList}>
      <A_ApplyAcceptButton
        isLeader={isLeader}
        haveOppositeTeam={haveOppositeTeam}
        oppsiteTeamUUID={oppsiteTeamUUID}
      />
      <A_ApplyRejectButton
        isLeader={isLeader}
        oppsiteTeamUUID={oppsiteTeamUUID}
      />
    </ul>
  );
};

export default M_ApplyAcceptButtonList;
