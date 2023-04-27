import React, { useState, useEffect } from "react";
import style from "./MyTeamList.module.scss";
import BlueHeartLine from "../UI/Common/BlueHeartLine";
import ListBoxWithImgTitle from "../UI/Common/ListBoxWithImgTitle";
import MyTeamListItem from "./MyTeamListItem";

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

const MyTeamList = () => {
  const [profileList, setProfileList] = useState<Profile[]>([]);

  useEffect(() => {
    while (PROFILE_LIST_DUMMY.length < 3) {
      PROFILE_LIST_DUMMY.push({
        name: "LOADING",
        age: null,
        introduce: "팀원을 기다리는 중...",
      });
    }
    setProfileList([...PROFILE_LIST_DUMMY]);
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
      ></ListBoxWithImgTitle>
    </div>
  );
};

export default MyTeamList;
