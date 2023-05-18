import { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../Common/Button_Type_A";
import { acceptMeeting } from "../../../api/team";
import { useRecoilState } from "recoil";
import { kid, myTeamUUID, myatk } from "../../../atom/member";
import { imLeader } from "../../../atom/member";

type propsType = {
  haveOppositeTeam: boolean;
  oppsiteTeamUUID: string;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const A_ApplyAcceptButton: React.FC<propsType> = ({
  haveOppositeTeam,
  oppsiteTeamUUID,
  clickBtn,
  setClickBtn,
}) => {
  const [isLeader] = useRecoilState<boolean>(imLeader);
  //버튼 클릭시 팀 수락한거임.
  const [myTUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const acceptTeam = async () => {
    if (isLeader) {
      await acceptMeeting(myTUUID, oppsiteTeamUUID, atk, kID)
        .then(() => {})
        .catch(() => {});
      setClickBtn(!clickBtn);
      window.location.reload();
    }
  };

  return (
    <Button_Type_A
      width="56px"
      height="32px"
      background={isLeader && haveOppositeTeam ? "#cad9ff" : "#BCBCBC"}
      disabled={isLeader && haveOppositeTeam}
      onClick={acceptTeam}
    >
      {isLeader && haveOppositeTeam ? (
        <img
          src={`${process.env.REACT_APP_ASSETS_DIR}/btn_check.png`}
          onClick={acceptTeam}
        />
      ) : (
        <img src={`${process.env.REACT_APP_ASSETS_DIR}/btn_blackcheck.png`} />
      )}
    </Button_Type_A>
  );
};

export default A_ApplyAcceptButton;
