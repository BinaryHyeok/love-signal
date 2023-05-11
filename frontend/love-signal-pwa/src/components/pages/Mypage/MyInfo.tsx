import { useState, useEffect } from "react";
import style from "./styles/MyInfo.module.scss";
import NickName from "./NickName";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";
import Age from "./Age";

type propsType = {
  age: number;
  nickname: string;
  description: string;
  handleInfoUpdate: () => void;
};

const MyInfo: React.FC<propsType> = ({
  age,
  nickname,
  description,
  handleInfoUpdate,
}) => {
  const [isNameChanging, setIsNameChanging] = useState<boolean>(false); //이름 바꿔줄 state
  const [isDescChanging, setIsDescChanging] = useState<boolean>(false); //자기소개 바꿔줄 state

  //시작값이 nickname
  const [myNickName, setMyNickName] = useState<string>("");

  //시작값이 description
  const [myIntroduce, setMyIntroduce] = useState<string>(description);

  useEffect(() => {
    setMyNickName(nickname);
    setMyIntroduce(description);
  }, [nickname, description]);

  const toggleNameView = () => {
    setIsNameChanging((prev) => !prev);
  };

  const toggleDescView = () => {
    setIsDescChanging((prev) => !prev);
  };

  return (
    <>
      <div className={style.container}>
        {!isNameChanging ? (
          <NickName nickname={myNickName} toggleMode={toggleNameView} />
        ) : (
          <EditNickName
            nickname={myNickName}
            handleInfoUpdate={handleInfoUpdate}
          />
        )}

        {!isDescChanging ? (
          <Introduce myIntroduce={myIntroduce} toggleMode={toggleDescView} />
        ) : (
          <EditIntroduce
            myIntroduce={myIntroduce}
            handleInfoUpdate={handleInfoUpdate}
          />
        )}
        <Age age={age} />
      </div>
    </>
  );
};

export default MyInfo;
