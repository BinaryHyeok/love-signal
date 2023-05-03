import { useState } from "react";
// import style from "./styles/MyInfo.module.scss";
import NickName from "./NickName";
import Age from "./Age";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";

const MyInfo = () => {
  const [changeName, setChangeName] = useState<boolean>(true); //이름 바꿔줄 state
  const [myNickName, setMyNickName] = useState<string>("김이슬");
  const [changeIntroduce, setChangeIntroduce] = useState<boolean>(true); //자기소개 바꿔줄 state
  const [myIntroduce, setMyIntroduce] = useState<string>("내가 프론트 리더");
  return (
    <>
      <div>
        {changeName ? (
          <NickName nickname={myNickName} changeName={setChangeName} />
        ) : (
          <EditNickName
            nickname={myNickName}
            changeName={setChangeName}
            setMyNickName={setMyNickName}
          />
        )}

        <Age />

        {changeIntroduce ? (
          <Introduce
            myIntroduce={myIntroduce}
            changeIntroduce={setChangeIntroduce}
          />
        ) : (
          <EditIntroduce
            myIntroduce={myIntroduce}
            changeIntroduce={setChangeIntroduce}
            setMyIntroduce={setMyIntroduce}
          />
        )}
      </div>
    </>
  );
};

export default MyInfo;
