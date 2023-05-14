import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CheckTeam from "../../UI/Modal/CheckTeam/CheckTeam";
import { team } from "../../../types/member";
import { getMyTeam, getOtherGenderTeam } from "../../../api/team";
import MsgModal from "../../UI/Modal/Msg/MsgModal";
import T_OtherGender from "./T_OtherGender";
import { imLeader, myGender, myTeamUUID, myatk } from "../../../atom/member";
import { kid } from "../../../atom/member";
import Ground from "../../UI/Three/Ground";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

const NUMBER = 5; //한번에 받아올 리스트의 수

let timeout: NodeJS.Timer;

const ExploreTeam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const [team, setTeam] = useState<team[]>([]);
  const [, setIdx] = useRecoilState<number>(footerIdx); //내 footer의 상태를 변경시켜줄 recoil입니다.
  const [uuidList, setuuidList] = useState<string[]>([]); //백에게 그동안 내가 받은 팀들의 UUID를 담아줄 state입니다.
  let [addNum, setaddNum] = useState<number>(NUMBER); //다음번에 추가시켜줄 리스트 수.
  let [receiveList, setReceiveList] = useState<number>(NUMBER); //받아올 리스트 수.
  let [infinityScroll, setInfinityScroll] = useState<boolean>(true); //일정 스크롤 이상내려가면 false로 바뀌고 axios요청이 성공하면 true로 다시변경.(무한스크롤)
  let [lastList, setLastList] = useState<boolean>(true); //백에서 더이상 받아올 팀이 없는지 확인해줄 state.
  let [memberLength, setMemberLength] = useState<number>(0);
  let [haveTeam, setHaveTeam] = useState<boolean>(false);

  const [msg, setMsg] = useState<string>("");
  const [applyModal, setApplyModal] = useState<boolean>(false);

  const [TUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [gender] = useRecoilState<string>(myGender);
  const [isLeader] = useRecoilState<boolean>(imLeader);

  useEffect(() => {
    getMyInfo();
    setIdx(0);
    getList();
  }, []);

  useEffect(() => {
    setMsg("");
  }, [visible]);

  const getMyInfo = async () => {
    if (isLeader) {
      //내가 팀리더면 팀원 3명인지 체크도 해줘야함.
      getMyTeam(TUUID, atk, kID)
        .then((res) => {
          setHaveTeam(res.data.body.haveMeetingTeam);
          setMemberLength(res.data.body.members.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //리스트를 받아올 axios 함수입니다.
  const getList = async () => {
    const OGender: string = gender === "F" ? "M" : "F"; //반대로 보여줘야하니 삼항연산자 사용.
    await getOtherGenderTeam(OGender, receiveList, uuidList, atk, kID)
      .then((res) => {
        setInfinityScroll(false);
        addmemberList(res.data.body.teams);
        adduuidList(res.data.body.teams);
        const length = res.data.body.teams.length;
        setaddNum(length);
        setIsLoading(true);
        setReceiveList(addNum);
        setInfinityScroll(false);
        setLastList(res.data.body.hasRemainingTeam);
      })
      .catch((err) => {
        console.log(err);
        //axios에러가 떴을때 해줄 것.
        setTimeout(() => {
          setIsLoading(true);
        }, 5000);
      });
  };

  //UUID를 추가시켜주는 함수입니다.
  const adduuidList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setuuidList((uuidList) => [...uuidList, item.teamUUID]);
    });
  };

  //팀을 추가시켜주는 함수입니다.
  const addmemberList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setTeam((team) => [...team, item]);
    });
  };

  //상세보기 모달창을 띄워주는 함수입니다.
  const viewDetail = (idx: number) => {
    //여기서 내가 팀이 있는지 없는지 체크를 해서 팀이 있으면 상세보기로 없으면 팀을 구성하라는 모달을 띄워주어야합니다.
    setTeamNumber(idx);
    setAnimation(false);
    clearTimeout(timeout);
    setVisible(true);
  };

  //뭔가 안이쁜데.. 코드가 짧아짐
  if (isLoading) {
    return (
      <ATKFilter>
        <GetMyInfo>
          {visible ? (
            <>
              <Modal_portal>
                <CheckTeam
                  timeout={timeout}
                  animation={animation}
                  setAnimation={setAnimation}
                  setVisible={setVisible}
                  visible={visible}
                  member={team[teamNumber].members}
                  oppositeTeamUUID={team[teamNumber].teamUUID}
                  myTeam={false}
                  applyModal={applyModal}
                  setMsg={setMsg}
                  setApplyModal={setApplyModal}
                  haveTeam={haveTeam}
                  memberLength={memberLength}
                >
                  {applyModal && <MsgModal msg={msg} />}
                </CheckTeam>
              </Modal_portal>
              <div>
                <T_OtherGender
                  getList={getList}
                  infinityScroll={infinityScroll}
                  lastList={lastList}
                  setInfinityScroll={setInfinityScroll}
                  viewDetail={viewDetail}
                  team={team}
                />
              </div>
            </>
          ) : (
            <>
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                // exit="exit"
              >
                <T_OtherGender
                  getList={getList}
                  infinityScroll={infinityScroll}
                  lastList={lastList}
                  setInfinityScroll={setInfinityScroll}
                  viewDetail={viewDetail}
                  team={team}
                />
              </motion.div>
            </>
          )}
        </GetMyInfo>
      </ATKFilter>
    );
  } else {
    return (
      <>
        <Ground />
      </>
    );
  }
};

export default ExploreTeam;
