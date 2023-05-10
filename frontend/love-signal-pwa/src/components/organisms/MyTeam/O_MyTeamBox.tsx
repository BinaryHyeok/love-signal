import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles/O_MyTeamBox.module.scss";
import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import { member } from "../../../types/member";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";
import { receivemeetingList } from "../../../api/team";
import { myTeamUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { applyTeam } from "../../../types/member";
import Button_Type_A from "../../UI/Common/Button_Type_A";

type propsType = {
  isLeader: boolean;
  haveOppositeTeam: boolean;
  memberList: member[];
  setMyVisible: Dispatch<SetStateAction<boolean>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  applyList: applyTeam[];
  setApplyList: Dispatch<SetStateAction<applyTeam[]>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
};

const O_MyTeamBox: React.FC<propsType> = ({
  isLeader,
  haveOppositeTeam,
  memberList,
  setMyVisible,
  setOppoVisible,
  setOppoTeamIdx,
  applyList,
  setApplyList,
}) => {
  const navigate = useNavigate();
  const [TeamUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);
  const [applyTeamExist, setApplyTeamExist] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (start) {
      receivemeetingList(TeamUUID)
        .then((res) => {
          setApplyList([]); //초기화 안시켜주면 계속 추가되어서 안됌
          addApplyList(res.data.body.teams);
          setStart(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clickBtn]);

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
    setIsLoading(true);
  };

  //팀 나가기 함수입니다.(이슬 담당)
  const exitTeam = () => {
    //팀 나가기에 대한 axios가 들어갈 요청입니다.
    setTeamUUID(""); //팀을 나갔으니 TeamUUID없애주기.
    navigate("/SameGender", { replace: true });
  };

  return (
    <div className={style.content}>
      <M_MyTeamList memberList={memberList} setVisible={setMyVisible} />
      <div className={style.exitBtn}>
        <Button_Type_A
          width="100px"
          height="32px"
          background="#CCCCCC"
          onClick={exitTeam}
          children="팀 나가기"
        />
      </div>
      <ListBoxWithImgTitle
        title={
          <>
            <img src="/assets/mail.png" />
            <span>신청목록</span>
            <img src="/assets/mail.png" />
          </>
        }
        type="blue"
      >
        {isLoading ? (
          <>
            {applyTeamExist ? (
              <O_ApplyTeamList
                applyTeamList={applyList}
                isLeader={isLeader}
                haveOppositeTeam={haveOppositeTeam}
                setOppoVisible={setOppoVisible}
                setOppoTeamIdx={setOppoTeamIdx}
                clickBtn={clickBtn}
                setClickBtn={setClickBtn}
              />
            ) : (
              <>팀이 존재하지 않습니다..</>
            )}
          </>
        ) : (
          <>로딩중이다데스..</>
        )}
      </ListBoxWithImgTitle>
    </div>
  );
};

export default O_MyTeamBox;
