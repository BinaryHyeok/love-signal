import { useState, useEffect } from "react";
import style from "./styles/MyInfo.module.scss";
import NickName from "./NickName";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";
import Age from "./Age";
import { useRecoilState } from "recoil";
import { kid, myMemberUUID, myatk } from "../../../atom/member";
import { changeMyInfo } from "../../../api/auth";

type propsType = {
  age: number;
  nickname: string;
  description: string;
  setNick: (param: string) => void;
  setDesc: (param: string) => void;
};

const MyInfo: React.FC<propsType> = ({
  age,
  nickname,
  description,
  setNick,
  setDesc,
}) => {
  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [isNameChanging, setIsNameChanging] = useState<boolean>(false);
  const [isDescChanging, setIsDescChanging] = useState<boolean>(false);

  const toggleNameView = () => {
    setIsNameChanging((prev) => !prev);
  };

  const toggleDescView = () => {
    setIsDescChanging((prev) => !prev);
  };

  const updateNickHandler = (newNick: string) => {
    changeMyInfo(UUID, newNick, description, atk, kID);
  };

  return (
    <>
      <div className={style.container}>
        {!isNameChanging ? (
          <NickName nickname={nickname} toggleMode={toggleNameView} />
        ) : (
          <EditNickName
            nickname={nickname}
            setNick={setNick}
            toggleMode={toggleNameView}
            nickSubmitHandler={updateNickHandler}
          />
        )}

        {!isDescChanging ? (
          <Introduce description={description} toggleMode={toggleDescView} />
        ) : (
          <EditIntroduce description={description} setDesc={setDesc} />
        )}
        <Age age={age} />
      </div>
    </>
  );
};

export default MyInfo;
