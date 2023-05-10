import React from "react";
import style from "./styles/M_ChatText_Select.module.scss";
import A_ChatText_TypeA from "../../atoms/Chat/A_ChatText_TypeA";

type PropsType = {
  systemName: string;
  selectInfo: {
    nicknames?: string[];
    profiles?: string[];
    isSelected?: string;
  };
};
const M_ChatText_Select: React.FC<PropsType> = ({ systemName, selectInfo }) => {
  return <A_ChatText_TypeA content={"대충 내용"} background="#fff" />;
};

export default M_ChatText_Select;
