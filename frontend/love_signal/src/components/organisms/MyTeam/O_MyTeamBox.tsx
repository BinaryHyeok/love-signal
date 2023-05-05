import { useState, useEffect } from "react";
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
};

const MEMBER_LIST_DUMMY: member[] = [
  {
    nickname: "John",
    age: 26,
    description: "Hello.",
  },
  {
    nickname: "Tom",
    age: 24,
    description: "Helloooooooo",
  },
  {
    nickname: "James",
    age: 29,
    description: "WTF",
  },
];

const DUMMY_APPLY_LIST: member[][] = [
  [
    {
      nickname: "John",
      age: 26,
      description: "Hello.",
    },
    {
      nickname: "Tom",
      age: 24,
      description: "Helloooooooo",
    },
    {
      nickname: "James",
      age: 29,
      description: "WTF",
    },
  ],
  [
    {
      nickname: "John",
      age: 26,
      description: "Hello.",
    },
    {
      nickname: "Tom",
      age: 24,
      description: "Helloooooooo",
    },
    {
      nickname: "James",
      age: 29,
      description: "WTF",
    },
  ],
];

const O_MyTeamBox: React.FC<propsType> = ({ isLeader, haveOppositeTeam }) => {
  const [memberList, setMemberList] = useState<member[]>([]);
  const [applyList, setApplyList] = useState<member[][]>([]);
  const [TeamUUID] = useRecoilState<string>(myTeamUUID);

  useEffect(() => {
    getMyTeam(TeamUUID)
      .then((res) => {
        // setMemberList(res.data); 여기서 axios로 우리 팀 받아오기.
      })
      .catch((err) => {
        console.log(err);
      });
    receivemeetingList(TeamUUID)
      .then((res) => {
        // setApplyList(res.data); 여기서 axios로 신청 받은 목록 불러오기.
      })
      .catch((err) => {
        console.log(err);
      });
    setMemberList([...MEMBER_LIST_DUMMY]);
    setApplyList([...DUMMY_APPLY_LIST]);
  }, []);

  return (
    <div className={style.content}>
      <M_MyTeamList memberList={memberList} />
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
        />
      </ListBoxWithImgTitle>
    </div>
  );
};

export default O_MyTeamBox;
