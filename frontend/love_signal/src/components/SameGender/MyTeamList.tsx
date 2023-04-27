import React, { useState, useEffect } from "react";
import style from "./MyTeamList.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";
import ListBoxWithImgTitle from "../UI/Common/ListBoxWithImgTitle";
import MyTeamListItem from "./MyTeamListItem";
import ApplyTeamList from "./ApplyTeamList";

type Profile = {
  name: string;
  age: number | null;
  introduce: string;
};

const PROFILE_LIST_DUMMY: Profile[] = [
  {
    name: "John",
    age: 26,
    introduce: "Hello.",
  },
  {
    name: "Tom",
    age: 24,
    introduce: "Helloooooooo",
  },
  {
    name: "James",
    age: 29,
    introduce: "WTF",
  },
];

const DUMMY_APPLY_LIST: Profile[][] = [
  [
    {
      name: "John",
      age: 26,
      introduce: "Hello.",
    },
    {
      name: "Tom",
      age: 24,
      introduce: "Helloooooooo",
    },
    {
      name: "James",
      age: 29,
      introduce: "WTF",
    },
  ],
  [
    {
      name: "John",
      age: 26,
      introduce: "Hello.",
    },
    {
      name: "Tom",
      age: 24,
      introduce: "Helloooooooo",
    },
    {
      name: "James",
      age: 29,
      introduce: "WTF",
    },
  ],
];

const MyTeamList = () => {
  const [profileList, setProfileList] = useState<Profile[]>([]);
  const [applyList, setApplyList] = useState<Profile[][]>([]);

  useEffect(() => {
    setProfileList([...PROFILE_LIST_DUMMY]);
    setApplyList([...DUMMY_APPLY_LIST]);
  }, [PROFILE_LIST_DUMMY]);

  return (
    <div className={style.content}>
      <ListBoxWithImgTitle
        title={
          <>
            <BlueHeartLine />
            <span>나의 팀</span>
            <BlueHeartLine />
          </>
        }
        type="blue"
      >
        <ul className={style.teamList}>
          {profileList.map((item) => (
            <MyTeamListItem profile={item} />
          ))}
        </ul>
      </ListBoxWithImgTitle>
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
        <ApplyTeamList applyList={applyList} />
      </ListBoxWithImgTitle>
    </div>
  );
};

export default MyTeamList;
