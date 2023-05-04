import Button_Type_A from "../../UI/Common/Button_Type_A";
import { myMemberUUID } from "../../../atom/member";

import { rejectMeeting } from "../../../api/team";
import { useRecoilState } from "recoil";

type propsType = {
  isLeader: boolean;
  oppsiteTeamUUID: string;
};

const A_ApplyRejectButton: React.FC<propsType> = ({
  isLeader,
  oppsiteTeamUUID,
}) => {
  const [myUUID] = useRecoilState<string>(myMemberUUID);

  //팀 거절을 눌렀을때.
  const rejectTeam = () => {
    rejectMeeting(myUUID, oppsiteTeamUUID);
  };

  return (
    <Button_Type_A
      width="56px"
      height="32px"
      background={isLeader ? "#ffadb6" : "#BCBCBC"}
      disabled={isLeader}
      onClick={rejectTeam}
    >
      {isLeader ? (
        <img src="/assets/btn_reject.png" />
      ) : (
        <img src="/assets/btn_blackreject.png" />
      )}
    </Button_Type_A>
  );
};

export default A_ApplyRejectButton;
