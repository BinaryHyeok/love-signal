import React, { useEffect, useState, useRef } from "react";
import style from "./styles/T_ChatRoom.module.scss";
import M_ChatRoomHeader from "../../molecules/Chat/M_ChatRoomHeader";
import O_ChatTextBox from "../../organisms/Chat/O_ChatTextBox";
import { chat, roomChatList } from "../../../types/chat";

import { useRecoilState } from "recoil";
import { nickname } from "../../../atom/member";
import { member } from "../../../types/member";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CheckTeam from "../../UI/Modal/CheckTeam/CheckTeam";

const ENUM_BACKGROUND: { [key: string]: string } = {
  TEAM: "#cad9ff",
  SYSTEM: "#fafbce",
  MEETING: "#fbced3",
  SECRET: "#dccefb",
};
Object.freeze(ENUM_BACKGROUND);

type PropsType = {
  className?: string;
  roomId?: string;
  title?: string;
  roomExitHandler: (type?: number) => void;
  roomType?: string;
  chatList: chat[];
  setChatList: React.Dispatch<React.SetStateAction<roomChatList>>;
  onTextSend: (text: chat) => void;
  members: member[] | null;
  myNick: string;
  updatedDate?: string;
};

let timeout: NodeJS.Timer;

const T_ChatRoom: React.FC<PropsType> = ({
  className,
  roomId,
  title,
  roomExitHandler,
  roomType,
  chatList,
  setChatList,
  onTextSend,
  members,
  myNick,
  updatedDate,
}) => {
  const box_chatRoom = useRef<HTMLDivElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);

  const [unitHeight, setUnitHeight] = useState<number>();
  const [me, _] = useRecoilState<string>(nickname);

  const [detailVisible, setDetailVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);
  const [oppositeTeamMember, setOppositeTeamMember] = useState<member[]>([]);
  const [oppositeTeamUUID, setOppositeTeamUUID] = useState<string>("");

  const [, setMsg] = useState<string>("");
  const [, setApplyModal] = useState<boolean>(false);
  const [isFirstEnter, setIsFirstEnter] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("resize", unitHeightSetHandler);
    window.addEventListener("touchend", unitHeightSetHandler);
    window.visualViewport?.addEventListener(
      "resize",
      resizeVisualViewportHandler
    );

    return () => {
      window.removeEventListener("resize", unitHeightSetHandler);
      window.removeEventListener("touchend", unitHeightSetHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        resizeVisualViewportHandler
      );
    };
  }, []);

  useEffect(() => {
    const lastChat = chatList[chatList.length - 1];
    if (
      isFirstEnter ||
      (!isFirstEnter && lastChat && lastChat.nickname === myNick)
    ) {
      if (ulRef.current) {
        ulRef.current.scrollTop = ulRef.current.scrollHeight + 100;
        setIsFirstEnter(false);
      }
    }
  }, [chatList]);

  const textSendHandler = (content: string) => {
    if (content.trim().length < 1) return;

    const newChat: chat = {
      type: "TEXT",
      roomUUID: roomId,
      nickname: me, // 임시 닉네임
      content: content,
    };

    // 채팅 서버에 채팅 publish
    onTextSend(newChat);
  };

  const onRoomExit = () => {
    roomExitHandler();
  };

  const unitHeightSetHandler = () => {
    let vh = window.visualViewport?.height;
    if (!vh) {
      vh = window.innerHeight * 0.01;
    } else {
      vh *= 0.01;
    }
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const resizeVisualViewportHandler = () => {
    const current = window.visualViewport?.height;
  };

  useEffect(() => {}, [unitHeight]);

  const viewDetail = () => {
    //여기서 내가 팀이 있는지 없는지 체크를 해서 팀이 있으면 상세보기로 없으면 팀을 구성하라는 모달을 띄워주어야합니다.
    setAnimation(false);
    clearTimeout(timeout);
    setDetailVisible(true);
  };

  return (
    <div className={`${style.chatRoom} ${className}`} ref={box_chatRoom}>
      {detailVisible ? (
        <>
          <Modal_portal>
            <CheckTeam
              timeout={timeout}
              animation={animation}
              setAnimation={setAnimation}
              setVisible={setDetailVisible}
              visible={detailVisible}
              member={oppositeTeamMember}
              oppositeTeamUUID={oppositeTeamUUID}
              myTeam={true}
              setMsg={setMsg}
              setApplyModal={setApplyModal}
            />
          </Modal_portal>
          <M_ChatRoomHeader
            onRoomExit={onRoomExit}
            roomId={roomId}
            title={title}
            count={members && members.length > 0 ? members.length + "" : ""}
            background={roomType ? ENUM_BACKGROUND[roomType] : ""}
          />
          <O_ChatTextBox
            // onTextSubmit={onTextSend}
            onTextSubmit={textSendHandler}
            onRoomExit={roomExitHandler}
            roomType={roomType}
            ulRef={ulRef}
            chatList={chatList}
            setChatList={setChatList}
            members={members}
            setOppositeTeamMember={setOppositeTeamMember}
            // setOppositeTeamUUID={setOppositeTeamUUID}
            viewDetail={viewDetail}
            updatedDate={updatedDate}
          />
        </>
      ) : (
        <>
          {" "}
          <M_ChatRoomHeader
            onRoomExit={onRoomExit}
            roomId={roomId}
            title={title}
            count={members && members.length > 0 ? members.length + "" : ""}
            background={roomType ? ENUM_BACKGROUND[roomType] : ""}
          />
          <O_ChatTextBox
            // onTextSubmit={onTextSend}
            onTextSubmit={textSendHandler}
            onRoomExit={roomExitHandler}
            roomType={roomType}
            ulRef={ulRef}
            chatList={chatList}
            setChatList={setChatList}
            members={members}
            setOppositeTeamMember={setOppositeTeamMember}
            // setOppositeTeamUUID={setOppositeTeamUUID}
            viewDetail={viewDetail}
            updatedDate={updatedDate}
          />
        </>
      )}
    </div>
  );
};

export default T_ChatRoom;
