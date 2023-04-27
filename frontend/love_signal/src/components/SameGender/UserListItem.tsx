import React from "react";
import style from "./UserListItem.module.scss";

const UserListItem = (props: any) => {
  return (
    <li className={style.listItem}>
      <div className={style.imgBox}></div>
      <div className={style.profileBox}>
        <div className={style.profile}>
          {props.profile.name}, {props.profile.age}
        </div>
        <div className={style.introduce}>{props.profile.introduce}</div>
      </div>
    </li>
  );
};

export default UserListItem;
