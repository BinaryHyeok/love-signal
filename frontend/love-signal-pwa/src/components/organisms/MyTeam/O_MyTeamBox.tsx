import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { member } from "../../../types/member";
import style from "./styles/O_MyTeamBox.module.scss";

import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import ListBoxWithImgTitle from "../../atoms/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";
import Button_Type_A from "../../atoms/Common/Button_Type_A";
import A_Heartline from "../../atoms/Common/A_Heartline";
import A_TextHighlight_Blink from "../../atoms/Common/A_TextHighlight_Blink";
import Modal_portal from "../../UI/Modal/Modal_portal";
import A_MyTeamListItem from "../../atoms/MyTeam/A_MyTeamListItem";

import { receiveMatchMember, receivemeetingList } from "../../../api/team";

import { kid, myTeamUUID, myatk } from "../../../atom/member";
import { myMemberUUID } from "../../../atom/member";
import { applyTeam } from "../../../types/member";
import { withdrawTeam } from "../../../api/team";
import { imLeader } from "../../../atom/member";

type propsType = {
  setExitVisible: Dispatch<SetStateAction<boolean>>;
  timeout: any;
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  haveOppositeTeam: boolean;
  memberList: member[];
  setMyVisible: Dispatch<SetStateAction<boolean>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  applyList: applyTeam[];
  setApplyList: Dispatch<SetStateAction<applyTeam[]>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
  matchMember: member[];
  setMatchMemberList: Dispatch<SetStateAction<member[]>>;
  setMatchTeamUUID: Dispatch<SetStateAction<string>>;
};

const MEMBER_LOADING_IMG = `${process.env.REACT_APP_ASSETS_DIR}/member_loading.png`;
let timer: NodeJS.Timer;

const O_MyTeamBox: React.FC<propsType> = ({
  setExitVisible,
  timeout,
  animation,
  setAnimation,
  haveOppositeTeam,
  memberList,
  setMyVisible,
  setOppoVisible,
  setOppoTeamIdx,
  applyList,
  setApplyList,
  matchMember,
  setMatchMemberList,
  setMatchTeamUUID,
}) => {
  const [TeamUUID] = useRecoilState<string>(myTeamUUID);
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);
  const [applyTeamExist, setApplyTeamExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  useEffect(() => {
    if (haveOppositeTeam) {
      timer = setInterval(() => {
        receivemeetingList(TeamUUID, atk, kID)
          .then((res) => {
            console.log(res);
            setApplyList([]); //초기화 안시켜주면 계속 추가되어서 안됌
            addApplyList(res.data.body.teams);
            setStart(false);
            setIsLoading(true);
          })
          .catch((err) => {
            console.log(err);
          });
      }, 2000);
      return () => {
        clearInterval(timer);
      };
    } else {
      //상대 팀이 있는 경우 그 팀의 리스트를 불러와줘.
      receiveMatchMember(TeamUUID, atk, kID)
        .then((res) => {
          console.log(res);
          const newList = [...res.data.body.members];
          if (res.data.body.members.length !== 3) {
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
          }
          setMatchMemberList([...newList]);
          setMatchTeamUUID(res.data.body.teamUUID);
          setStart(false);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(true);
  }, [clickBtn, haveOppositeTeam]);

  useEffect(() => {
    if (!start) {
      setStart(true);
    }
    if (applyList.length === 0) {
      setApplyTeamExist(false);
    } else {
      setApplyTeamExist(true);
    }
  }, [applyList]);

  const addApplyList = (applyTeamList: applyTeam[]) => {
    applyTeamList.forEach((item) => {
      setApplyList((applyTeam) => [...applyTeam, item]);
    });
  };

  //팀 나가기 했을 때 모달창 여는 함수
  const exitTeam = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setExitVisible(true);
  };

  const openModal = () => {
    setAnimation(false);
    clearTimeout(timeout);
    setOppoVisible(true);
  };

  return (
    <div className={style.content}>
      <M_MyTeamList
        timeout={timeout}
        animation={animation}
        setAnimation={setAnimation}
        memberList={memberList}
        setVisible={setMyVisible}
      />
      <div className={style.exitBtn}>
        <Button_Type_A
          width="90%"
          height="32px"
          background="#BCC5F0"
          margin="0px 0px 16px 0px"
          onClick={exitTeam}
          children="팀 나가기"
        />
        {haveOppositeTeam ? (
          <A_TextHighlight_Blink color="blue" fontSize="0.8rem">
            * 주의 : 팀 나가기를 누르면 팀이 터집니다
          </A_TextHighlight_Blink>
        ) : (
          <A_TextHighlight_Blink color="blue" fontSize="0.8rem">
            * 주의 : 이성팀과 매칭된 이후 팀 나가기를 누르면 팀에서 나가집니다
          </A_TextHighlight_Blink>
        )}
      </div>
      {haveOppositeTeam ? (
        <ListBoxWithImgTitle
          title={
            <>
              <img src={`${process.env.REACT_APP_ASSETS_DIR}/mail.png`} />
              <span>신청목록</span>
              <img src={`${process.env.REACT_APP_ASSETS_DIR}/mail.png`} />
            </>
          }
          type="blue"
        >
          {isLoading ? (
            <>
              {applyTeamExist ? (
                <O_ApplyTeamList
                  animation={animation}
                  setAnimation={setAnimation}
                  timeout={timeout}
                  applyTeamList={applyList}
                  haveOppositeTeam={haveOppositeTeam}
                  setOppoVisible={setOppoVisible}
                  setOppoTeamIdx={setOppoTeamIdx}
                  clickBtn={clickBtn}
                  setClickBtn={setClickBtn}
                />
              ) : (
                <div className={style.listbox}>
                  신청한 팀이 존재하지 않습니다
                </div>
              )}
            </>
          ) : (
            <div>불러오는 중..</div>
          )}
        </ListBoxWithImgTitle>
      ) : (
        <ListBoxWithImgTitle
          title={
            <>
              <A_Heartline type="red" count="3" />
              <span>상대 팀</span>
              <A_Heartline type="red" count="3" />
            </>
          }
          type="red"
        >
          <ul className={style.teamList} onClick={openModal}>
            {matchMember.map((member, idx) => (
              <A_MyTeamListItem key={idx} member={member} />
            ))}
          </ul>
        </ListBoxWithImgTitle>
      )}
    </div>
  );
};

export default O_MyTeamBox;
