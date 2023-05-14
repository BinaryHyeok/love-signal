import { useState, useEffect } from "react";
import style from "./styles/MyTeam.module.scss";
import T_MyTeam from "../../templates/MyTeam/T_MyTeam";
import M_MyTeamDesc from "../../molecules/MyTeam/M_MyTeamDesc";
import O_MyTeamBox from "../../organisms/MyTeam/O_MyTeamBox";
import { kid, myatk } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { member } from "../../../types/member";
import { myTeamUUID } from "../../../atom/member";
import { getMyTeam } from "../../../api/team";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CheckTeam from "../../UI/Modal/CheckTeam/CheckTeam";
import { applyTeam } from "../../../types/member";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

const MEMBER_LOADING_IMG = `${process.env.REACT_APP_ASSETS_DIR}/member_loading.png`;

const MyTeam = () => {
  //내가 상대팀이 있는지 파악해주는 state변수입니다.
  const [haveOppositeTeam, setHaveOppositeTeam] = useState<boolean>(false);

  const [memberList, setMemberList] = useState<member[]>([]);
  const [matchMember, setMatchMemberList] = useState<member[]>([]);
  const [matchTeamUUID, setMatchTeamUUID] = useState<string>("");
  const [applyList, setApplyList] = useState<applyTeam[]>([]);
  const [teamUUID] = useRecoilState<string>(myTeamUUID);

  const [oppoTeamIdx, setOppoTeamIdx] = useState<number>(0);

  //나의 팀 모달창 띄워줄 함수
  const [myVisible, setMyVisible] = useState<boolean>(false);

  //상대 팀 모달창 띄워줄 함수.
  const [oppoVisible, setOppoVisible] = useState<boolean>(false);

  const [, setMsg] = useState<string>("");
  const [applyModal, setApplyModal] = useState<boolean>(false);

  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  //가져올 axios는 나의 팀 정보, 우리팀에 들어온 신청정보.
  useEffect(() => {
    getUserTeamInfo();
  }, []);

  const getUserTeamInfo = async () => {
    await getMyTeam(teamUUID, atk, kID)
      .then((res) => {
        console.log(res);
        const newList = [...res.data.body.members];
        if (res.data.body.members.length !== 3) {
          //나의 팀 페이지로 왔는데 길이가 3이 아니라는것은 현재 팀 매칭이 되어있으면서 중간에 팀원이 나간것입니다.
          while (newList.length < 3) {
            newList.push({
              memberUUID: "",
              nickname: "나간 사람",
              age: 0,
              description: "팀을 나간 인원입니다.",
              profileImage: MEMBER_LOADING_IMG,
            });
          }
        }
        setMemberList([...newList]);
        //내가 상대팀을 가지고 있는지를 파악.
        if (!res.data.body.haveMeetingTeam) {
          //상대팀이 없을시 true로 변경.
          setHaveOppositeTeam(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ATKFilter>
      <GetMyInfo>
        <TeamBuildFilter>
          {myVisible && !oppoVisible && (
            <Modal_portal>
              <CheckTeam
                setVisible={setMyVisible}
                visible={myVisible}
                member={memberList}
                oppositeTeamUUID=""
                myTeam={true}
                setMsg={setMsg}
                applyModal={applyModal}
                setApplyModal={setApplyModal}
              >
                <></>
              </CheckTeam>
            </Modal_portal>
          )}
          {!myVisible && oppoVisible && (
            <Modal_portal>
              <CheckTeam
                setVisible={setOppoVisible}
                visible={oppoVisible}
                member={
                  haveOppositeTeam
                    ? applyList[oppoTeamIdx].members
                    : matchMember
                }
                oppositeTeamUUID={
                  haveOppositeTeam
                    ? applyList[oppoTeamIdx].teamUUID
                    : matchTeamUUID
                }
                myTeam={true}
                applyModal={applyModal}
                setMsg={setMsg}
                setApplyModal={setApplyModal}
              >
                <></>
              </CheckTeam>
            </Modal_portal>
          )}
          {!myVisible && !oppoVisible && (
            <div className={style.container}>
              <T_MyTeam>
                <M_MyTeamDesc />
                <O_MyTeamBox
                  haveOppositeTeam={haveOppositeTeam}
                  memberList={memberList}
                  setMyVisible={setMyVisible}
                  setOppoVisible={setOppoVisible}
                  applyList={applyList}
                  setApplyList={setApplyList}
                  setOppoTeamIdx={setOppoTeamIdx}
                  matchMember={matchMember}
                  setMatchMemberList={setMatchMemberList}
                  setMatchTeamUUID={setMatchTeamUUID}
                />
              </T_MyTeam>
            </div>
          )}
        </TeamBuildFilter>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default MyTeam;
