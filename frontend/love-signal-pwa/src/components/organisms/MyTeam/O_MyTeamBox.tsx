import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./styles/O_MyTeamBox.module.scss";
import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import { member } from "../../../types/member";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";
import { getMyTeam } from "../../../api/team";
import { receivemeetingList } from "../../../api/team";
import { myTeamUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";

type propsType = {
  isLeader: boolean;
  haveOppositeTeam: boolean;
  memberList: member[];
  setMyVisible: Dispatch<SetStateAction<boolean>>;
  setOppoVisible: Dispatch<SetStateAction<boolean>>;
  applyList: member[][];
  setApplyList: Dispatch<SetStateAction<member[][]>>;
  setOppoTeamIdx: Dispatch<SetStateAction<number>>;
};

const DUMMY_APPLY_LIST: member[][] = [
  [
    {
      nickname: "John",
      age: 26,
      description: "Hello.",
      profileImage: "/assets/girl1.png",
    },
    {
      nickname: "Tom",
      age: 24,
      description: "Helloooooooo",
      profileImage: "/assets/girl2.png",
    },
    {
      nickname: "James",
      age: 29,
      description: "WTF",
      profileImage: "/assets/girl3.png",
    },
  ],
  [
    {
      nickname: "John",
      age: 26,
      description: "Hello.",
      profileImage: "/assets/girl1.png",
    },
    {
      nickname: "Tom",
      age: 24,
      description: "Helloooooooo",
      profileImage: "/assets/girl2.png",
    },
    {
      nickname: "James",
      age: 29,
      description: "WTF",
      profileImage: "/assets/girl3.png",
    },
  ],
];

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

  useEffect(() => {
    receivemeetingList(TeamUUID)
      .then((res) => {
        // setApplyList(res.data); 여기서 axios로 신청 받은 목록 불러오기.
      })
      .catch((err) => {
        console.log(err);
      });
    setApplyList([...DUMMY_APPLY_LIST]);
  }, []);

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
          <O_ApplyTeamList
            applyTeamList={applyList}
            isLeader={isLeader}
            haveOppositeTeam={haveOppositeTeam}
            setOppoVisible={setOppoVisible}
            setOppoTeamIdx={setOppoTeamIdx}
          />
        </ListBoxWithImgTitle>
      </div>
    </>
  );
};

export default O_MyTeamBox;
