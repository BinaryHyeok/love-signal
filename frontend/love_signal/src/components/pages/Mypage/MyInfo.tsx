import React, { useState } from "react";
import style from "./MyInfo.module.scss";
import NickName from "./NickName";
import Age from "./Age";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";

const MyInfo = () => {
  const [changeName, setChangeName] = useState<boolean>(true); //이름 바꿔줄 state
  const [changeIntroduce, setChangeIntroduce] = useState<boolean>(true); //자기소개 바꿔줄 state
  return (
    <>
      <div>
        {changeName ? (
          <NickName changeName={setChangeName} />
        ) : (
          <EditNickName changeName={setChangeName} />
        )}

        <Age />

        {changeIntroduce ? (
          <Introduce changeIntroduce={setChangeIntroduce} />
        ) : (
          <EditIntroduce changeIntroduce={setChangeIntroduce} />
        )}
      </div>
    </>
  );
};

export default MyInfo;
