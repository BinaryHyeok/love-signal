import { useState, useEffect } from "react";
import style from "./styles/O_TeamMemberList.module.scss";
import M_TeamMemberItem from "../../molecules/TeamBuild/M_TeamMemberItem";
import { member } from "../../../types/member";

const PROFILE_LIST_DUMMY: member[] = [
  {
    nickname: "John",
    age: 26,
    description: "Hello.",
    imgSrc:
      "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
  },
  // {
  //   nickname: "Tom",
  //   age: 24,
  //   description: "Helloooooooo",
  // },
];

const MEMBER_LOADING_IMG = "/assets/member_loading.png";

const O_TeamMemberList = () => {
  const [profileList, setProfileList] = useState<member[]>([]);

  useEffect(() => {
    const newList = [...PROFILE_LIST_DUMMY];
    while (newList.length < 3) {
      newList.push({
        nickname: "LOADING",
        age: 0,
        description: "",
        imgSrc: MEMBER_LOADING_IMG,
      });
    }
    setProfileList([...newList]);
  }, [PROFILE_LIST_DUMMY]);

  return (
    <ul className={style.userList}>
      {profileList.map((member, idx) => (
        <M_TeamMemberItem key={idx} member={member} />
      ))}
    </ul>
  );
};

export default O_TeamMemberList;
