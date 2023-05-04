import React, { useRef, useEffect } from "react";
import style from "./styles/O_ChatTextList.module.scss";
import M_ChatTextItem from "../../molecules/Chat/M_ChatTextItem";

type PropsType = {
  roomType?: string;
  onResize: (param: number) => void;
  height: number;
  setOrgListHeight: (param: number) => void;
};

const O_ChatTextList: React.FC<PropsType> = ({
  roomType,
  onResize,
  height,
  setOrgListHeight,
}) => {
  const listHeight = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const orgListHeight = listHeight.current?.offsetHeight;
    console.log(orgListHeight);
    // setOrgListHeight(orgListHeight + 64);

    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const keyboardHeight =
        viewportHeight - document.documentElement.clientHeight;

      // onResize(orgListHeight - keyboardHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ul className={style.textList} style={{ height }}>
      <M_ChatTextItem
        roomType={roomType}
        isMe={true}
        text={"안녕하세요"}
        sendTime={"2023-04-30 11:58:38"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
      <M_ChatTextItem
        roomType={roomType}
        text={"반가워요~~"}
        sender={"Tom"}
        sendTime={"2023-04-30 12:02:12"}
      />
    </ul>
  );
};

export default O_ChatTextList;
