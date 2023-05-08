import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./styles/O_MyTeamBox.module.scss";
import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import { member } from "../../../types/member";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";
import { receivemeetingList } from "../../../api/team";
import { myTeamUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { applyTeam } from "../../../types/member";

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
  const [TeamUUID] = useRecoilState<string>(myTeamUUID);
  const [clickBtn, setClickBtn] = useState<boolean>(false);
  const [start, setStart] = useState<boolean>(true);
  const [applyTeamExist, setApplyTeamExist] = useState<boolean>(false);

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
  };

  return (
    <>
      <div className={style.content}>
        <M_MyTeamList memberList={memberList} setVisible={setMyVisible} />
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
        </ListBoxWithImgTitle>
      </div>
    </>
  );
};

export default O_MyTeamBox;
