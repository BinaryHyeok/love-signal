import { useState, useEffect } from "react";
import style from "./styles/O_TeamMemberList.module.scss";
import M_TeamMemberItem from "../../molecules/TeamBuild/M_TeamMemberItem";
import { member } from "../../../types/member";

const PROFILE_LIST_DUMMY: member[] = [
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
];

const O_TeamMemberList = () => {
  const [profileList, setProfileList] = useState<member[]>([]);

  useEffect(() => {
    while (PROFILE_LIST_DUMMY.length < 3) {
      PROFILE_LIST_DUMMY.push({
        nickname: "LOADING",
        age: 0,
        description: "팀원을 기다리는 중...",
      });
    }
    setProfileList([...PROFILE_LIST_DUMMY]);
  }, [PROFILE_LIST_DUMMY]);

  return (
    <ul className={style.userList}>
      {PROFILE_LIST_DUMMY.map((profile, idx) => (
        <M_TeamMemberItem key={idx} member={profile} />
      ))}
    </ul>
  );
};

export default O_TeamMemberList;
