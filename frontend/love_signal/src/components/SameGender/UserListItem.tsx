import React from "react";
import style from "./UserListItem.module.scss";

const UserListItem = () => {
  return (
    <li className={style.listItem}>
      <div className={style.imgBox}></div>
      <div className={style.profileBox}></div>
    </li>
  );
};

export default UserListItem;
