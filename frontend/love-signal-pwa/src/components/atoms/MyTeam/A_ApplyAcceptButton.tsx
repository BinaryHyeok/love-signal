import { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { acceptMeeting } from "../../../api/team";
import { useRecoilState } from "recoil";
import { myMemberUUID } from "../../../atom/member";
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
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const acceptTeam = () => {
    if (isLeader) {
      acceptMeeting(myUUID, oppsiteTeamUUID);
      setClickBtn(!clickBtn);
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
        <img src="/assets/btn_check.png" onClick={acceptTeam} />
      ) : (
        <img src="/assets/btn_blackcheck.png" />
      )}
    </Button_Type_A>
  );
};

export default A_ApplyAcceptButton;
