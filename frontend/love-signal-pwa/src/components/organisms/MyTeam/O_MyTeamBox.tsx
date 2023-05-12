import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles/O_MyTeamBox.module.scss";
import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import { member } from "../../../types/member";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";
import { receivemeetingList } from "../../../api/team";
import { kid, myTeamUUID, myatk } from "../../../atom/member";
import { myMemberUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { applyTeam } from "../../../types/member";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { withdrawTeam } from "../../../api/team";
import { imLeader } from "../../../atom/member";

type propsType = {
  haveOppositeTeam: boolean;
  memberList: member[];
  setMyVisible: Dispatch<SetStateAction<boolean>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  applyList: applyTeam[];
  setApplyList: Dispatch<SetStateAction<applyTeam[]>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
};

const O_MyTeamBox: React.FC<propsType> = ({
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
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [isleader, setIsLeader] = useRecoilState<boolean>(imLeader);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  useEffect(() => {
    if (start) {
      receivemeetingList(TeamUUID, atk, kID)
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
      {haveOppositeTeam ? (
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
      ) : (
        <>여기엔 상대팀이 들어가야해.</>
      )}
    </div>
  );
};

export default O_MyTeamBox;
