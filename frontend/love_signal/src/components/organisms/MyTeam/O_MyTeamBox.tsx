import { useState, useEffect } from "react";
import style from "./styles/O_MyTeamBox.module.scss";
import M_MyTeamList from "../../molecules/MyTeam/M_MyTeamList";
import { member } from "../../../types/member";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import O_ApplyTeamList from "./O_ApplyTeamList";

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

const O_MyTeamBox = () => {
  const [memberList, setMemberList] = useState<member[]>([]);
  const [applyList, setApplyList] = useState<member[][]>([]);

  useEffect(() => {
    setMemberList([...MEMBER_LIST_DUMMY]);
    setApplyList([...DUMMY_APPLY_LIST]);
  }, [MEMBER_LIST_DUMMY]);

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
        <O_ApplyTeamList applyTeamList={applyList} />
      </ListBoxWithImgTitle>
    </div>
  );
};

export default O_MyTeamBox;
