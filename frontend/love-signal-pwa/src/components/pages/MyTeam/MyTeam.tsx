import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import style from "./styles/MyTeam.module.scss";
import { contentVariants } from "../../atoms/Common/contentVariants";

import T_MyTeam from "../../templates/MyTeam/T_MyTeam";
import M_MyTeamDesc from "../../molecules/MyTeam/M_MyTeamDesc";
import O_MyTeamBox from "../../organisms/MyTeam/O_MyTeamBox";
import Modal_portal from "../../UI/Modal/Modal_portal";
import TeamBuildFilter from "../../Filter/TeamBuildFilter";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";
import CheckTeam from "../../UI/Modal/CheckTeam/CheckTeam";

import { imLeader, kid, myMemberUUID, myatk } from "../../../atom/member";
import { myTeamUUID } from "../../../atom/member";
import { member } from "../../../types/member";
import { applyTeam } from "../../../types/member";
import { getMyTeam, withdrawTeam } from "../../../api/team";
import ModalBox from "../../UI/Modal/Common/ModalBox";
import A_TextHighlight_Blink from "../../atoms/Common/A_TextHighlight_Blink";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import { useNavigate } from "react-router-dom";

const MEMBER_LOADING_IMG = `${process.env.REACT_APP_ASSETS_DIR}/member_loading.png`;

let timeout: NodeJS.Timer;

const MyTeam = () => {
  //내가 상대팀이 있는지 파악해주는 state변수입니다.
  const [haveOppositeTeam, setHaveOppositeTeam] = useState<boolean>(true);

  const [memberList, setMemberList] = useState<member[]>([]);
  const [matchMember, setMatchMemberList] = useState<member[]>([]);
  const [matchTeamUUID, setMatchTeamUUID] = useState<string>("");
  const [applyList, setApplyList] = useState<applyTeam[]>([]);
  const [teamUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);

  const [oppoTeamIdx, setOppoTeamIdx] = useState<number>(0);

  //나의 팀 모달창 띄워줄 함수
  const [myVisible, setMyVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  //상대 팀 모달창 띄워줄 함수.
  const [oppoVisible, setOppoVisible] = useState<boolean>(false);

  //팀 나가기 모달창
  const [exitVisible, setExitVisible] = useState<boolean>(false);

  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [, setIsLeader] = useRecoilState<boolean>(imLeader);

  const [, setMsg] = useState<string>("");
  const [applyModal, setApplyModal] = useState<boolean>(false);

  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const navigate = useNavigate();

  //가져올 axios는 나의 팀 정보, 우리팀에 들어온 신청정보.
  useEffect(() => {
    getUserTeamInfo();
  }, []);

  useEffect(() => {}, [exitVisible]);

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
        if (res.data.body.haveMeetingTeam) {
          //상대팀이 있을시 false로 변경.
          setHaveOppositeTeam(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //팀 나가기 함수입니다.
  const exitTeam = () => {
    //팀 나가기에 대한 axios가 들어갈 요청입니다.
    withdrawTeam(myUUID, atk, kID)
      .then((res) => {
        setTeamUUID(""); //팀을 나갔으니 TeamUUID없애주기.
        setIsLeader(false);
        navigate("/SameGender", { replace: true });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setExitVisible(false), 500);
  };

  return (
    <ATKFilter>
      <GetMyInfo>
        <TeamBuildFilter>
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {exitVisible && !haveOppositeTeam && (
              <div className={style.bgContainer}>
                <div
                  className={`${style.background} ${
                    animation ? `${style.disappear}` : ""
                  }`}
                  onClick={closeModal}
                ></div>
                <ModalBox
                  animation={animation}
                  visible={exitVisible}
                  width="90%"
                  height="200px"
                  closeModal={closeModal}
                >
                  <div className={style.exitDesc}>
                    <A_TextHighlight_Blink color="blue" fontSize="1rem">
                      지금 팀에서 나가시면 <br /> 다른 팀에 합류하셔야합니다.{" "}
                    </A_TextHighlight_Blink>
                    <br />
                    <span className={style.bold}>정말 나가시겠습니까?</span>
                    <br />
                    <Button_Type_A
                      width="90%"
                      background="#BCC5F0"
                      onClick={exitTeam}
                    >
                      팀 나가기
                    </Button_Type_A>
                  </div>
                </ModalBox>
              </div>
            )}
            {exitVisible && haveOppositeTeam && (
              <div className={style.bgContainer}>
                <div
                  className={`${style.background} ${
                    animation ? `${style.disappear}` : ""
                  }`}
                  onClick={closeModal}
                ></div>
                <ModalBox
                  animation={animation}
                  visible={exitVisible}
                  width="90%"
                  height="200px"
                  closeModal={closeModal}
                >
                  <div className={style.exitDesc}>
                    <A_TextHighlight_Blink color="blue" fontSize="1rem">
                      지금 팀에서 나가시면 <br /> 현재 있는 방이 터지게 됩니다.{" "}
                    </A_TextHighlight_Blink>
                    <br />
                    <span className={style.bold}>정말 나가시겠습니까?</span>
                    <br />
                    <Button_Type_A
                      width="90%"
                      background="#BCC5F0"
                      onClick={exitTeam}
                    >
                      팀 나가기
                    </Button_Type_A>
                  </div>
                </ModalBox>
              </div>
            )}
            {myVisible && !oppoVisible && (
              <Modal_portal>
                <CheckTeam
                  timeout={timeout}
                  animation={animation}
                  setAnimation={setAnimation}
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
                  timeout={timeout}
                  animation={animation}
                  setAnimation={setAnimation}
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
                    setExitVisible={setExitVisible}
                    timeout={timeout}
                    animation={animation}
                    setAnimation={setAnimation}
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
          </motion.div>
        </TeamBuildFilter>
      </GetMyInfo>
    </ATKFilter>
  );
};

export default MyTeam;
