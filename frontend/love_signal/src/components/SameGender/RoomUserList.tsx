import React, { useEffect, useState } from "react";
import style from "./RoomUserList.module.scss";
import UserListItem from "./UserListItem";

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
];

const RoomUserList = () => {
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
    <ul className={style.userList}>
      {PROFILE_LIST_DUMMY.map((profile) => (
        <UserListItem profile={profile} />
      ))}
    </ul>
  );
};

export default RoomUserList;
