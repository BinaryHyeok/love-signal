import { useState, useEffect } from "react";
import style from "./styles/O_TeamMemberList.module.scss";
import M_TeamMemberItem from "../../molecules/TeamBuild/M_TeamMemberItem";
import { member } from "../../../types/member";

const MEMBER_LOADING_IMG = "/assets/member_loading.png";

const O_TeamMemberList = () => {
  const [profileList, setProfileList] = useState<member[]>([]);

  useEffect(() => {
    const newList = [...profileList];
    while (newList.length < 3) {
      newList.push({
        memberUUID: "",
        nickname: "LOADING",
        age: 0,
        description: "",
        profileImage: MEMBER_LOADING_IMG,
      });
    }
    setProfileList([...newList]);
  }, []);

  return (
    <ul className={style.userList}>
      {profileList.map((member, idx) => (
        <M_TeamMemberItem key={idx} member={member} />
      ))}
    </ul>
  );
};

export default O_TeamMemberList;
