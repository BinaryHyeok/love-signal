import { useState, useEffect } from "react";
import style from "./styles/MyTeam.module.scss";
import T_MyTeam from "../../templates/MyTeam/T_MyTeam";
import M_MyTeamDesc from "../../molecules/MyTeam/M_MyTeamDesc";
import O_MyTeamBox from "../../organisms/MyTeam/O_MyTeamBox";
import { inquireMember } from "../../../api/auth";
import { myMemberUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { member } from "../../../types/member";
import { myTeamUUID } from "../../../atom/member";
import { getMyTeam } from "../../../api/team";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CheckTeam from "../../UI/Modal/CheckTeam/CheckTeam";

const MyTeam = () => {
  //현재 우리팀이 상대팀이 매칭이 되어있는지 확인하기.(임시입니다.)
  //내가 팀 리더인지 파악을 할 수 있어야한다. (현재 내가 팀이 있을때 teamLeader가 true인지 false인지 파악.)

  //내가 상대팀이 있는지 파악해주는 state변수입니다.
  const [haveOppositeTeam, setHaveOppositeTeam] = useState<boolean>(false);

  //내가 현재 리더인지 파악해주는 state변수입니다.
  const [isLeader, setIsLeader] = useState<boolean>(true);

  //내 개인 UUID 입니다.
  // const [myUUID, setmyUUID] = useRecoilState<string>(myMemberUUID);
  const [memberList, setMemberList] = useState<member[]>([]);
  const [applyList, setApplyList] = useState<member[][]>([]);
  const [teamUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);

  //나의 팀 모달창 띄워줄 함수
  const [myVisible, setMyVisible] = useState<boolean>(false);

  //상대 팀 모달창 띄워줄 함수.
  const [oppoVisible, setOppoVisible] = useState<boolean>(false);

  //들어올 때 마다 axios요청을해서 내 개인정보를 불러오고 거기에 팀 리더인지, 팀이 있는지를 파악해주자.
  //가져올 axios는 나의 팀 정보, 우리팀에 들어온 신청정보.
  useEffect(() => {
    getUserInfo();
    getUserTeamInfo();
  }, []);

  //axios로 내 정보 받아오기.
  const getUserInfo = async () => {
    await inquireMember("ab30cc8f-ad61-416d-bf7a-a5be67719f9f")
      .then((res) => {
        console.log(res.data.body); //해당 정보 보고 판단.
        // setmyUUID(res.data.body.memberUUID);
        setTeamUUID(res.data.body.teamUUID);
        //내가 리더면 변경.
        if (res.data.body.teamLeader) {
          setIsLeader(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserTeamInfo = async () => {
    console.log(teamUUID);
    await getMyTeam(teamUUID)
      .then((res) => {
        console.log(res);
        setMemberList(res.data.body.members);

        //내가 상대팀을 가지고 있는지를 파악.
        if (res.data.body.haveMeetingTeam) {
          setHaveOppositeTeam(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {myVisible && !oppoVisible ? (
        <Modal_portal>
          <CheckTeam
            setVisible={setMyVisible}
            visible={myVisible}
            member={memberList}
            oppositeTeamUUID=""
          />
        </Modal_portal>
      ) : (
        <div className={style.container}>
          <T_MyTeam>
            <M_MyTeamDesc />
            <O_MyTeamBox
              isLeader={isLeader}
              haveOppositeTeam={haveOppositeTeam}
              memberList={memberList}
              myVisible={myVisible}
              setMyVisible={setMyVisible}
              oppoVisible={oppoVisible}
              setOppoVisible={setOppoVisible}
            />
          </T_MyTeam>
        </div>
      )}
    </>
  );
};

export default MyTeam;
