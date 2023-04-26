import React from "react";
import style from "./RoomUserList.module.scss";
import UserListItem from "./UserListItem";

const RoomUserList = () => {
  return (
    <ul className={style.userList}>
      <UserListItem />
      <UserListItem />
      <UserListItem />
    </ul>
  );
};

export default RoomUserList;
