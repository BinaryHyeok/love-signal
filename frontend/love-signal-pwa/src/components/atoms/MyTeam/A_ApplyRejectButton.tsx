import { Dispatch, SetStateAction } from "react";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { myMemberUUID } from "../../../atom/member";

import { rejectMeeting } from "../../../api/team";
import { imLeader } from "../../../atom/member";
import { useRecoilState } from "recoil";

type propsType = {
  oppsiteTeamUUID: string;
  clickBtn: boolean;
  setClickBtn: Dispatch<SetStateAction<boolean>>;
};

const A_ApplyRejectButton: React.FC<propsType> = ({
  oppsiteTeamUUID,
  clickBtn,
  setClickBtn,
}) => {
  // const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [isLeader] = useRecoilState<boolean>(imLeader);
  //팀 거절을 눌렀을때.
  const rejectTeam = async () => {
    if (isLeader) {
      await rejectMeeting(
        "3c0f0a1f-ac05-4c7f-848d-638298b52ef6",
        oppsiteTeamUUID
      );
      setClickBtn(!clickBtn);
    }
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
        <img src="/assets/btn_reject.png" onClick={rejectTeam} />
      ) : (
        <img src="/assets/btn_blackreject.png" />
      )}
    </Button_Type_A>
  );
};

export default A_ApplyRejectButton;
