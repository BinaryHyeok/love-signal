import { useState } from "react";
import style from "./styles/MyInfo.module.scss";
import NickName from "../../molecules/Mypage/NickName";
import Introduce from "../../molecules/Mypage/Introduce";
import EditNickName from "../../molecules/Mypage/EditNickName";
import EditIntroduce from "../../molecules/Mypage/EditIntroduce";
import Age from "../../atoms/Mypage/Age";
import { useRecoilState } from "recoil";
import { kid, myMemberUUID, myatk } from "../../../atom/member";
import { changeMyInfo } from "../../../api/auth";
import { nickname } from "../../../atom/member";

type propsType = {
  age: number;
  mynickname: string;
  description: string;
  setNick: (param: string) => void;
  setDesc: (param: string) => void;
};

const MyInfo: React.FC<propsType> = ({
  age,
  mynickname,
  description,
  setNick,
  setDesc,
}) => {
  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);
  const [, setMyNickname] = useRecoilState<string>(nickname);

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
    setMyNickname(newNick);
  };

  const updateDescHandler = (newDesc: string) => {
    changeMyInfo(UUID, mynickname, newDesc, atk, kID);
  };

  return (
    <>
      <div className={style.container}>
        {!isNameChanging ? (
          <NickName
            age={age}
            mynickname={mynickname}
            toggleMode={toggleNameView}
          />
        ) : (
          <EditNickName
            age={age}
            mynickname={mynickname}
            setNick={setNick}
            toggleMode={toggleNameView}
            nickSubmitHandler={updateNickHandler}
          />
        )}

        {!isDescChanging ? (
          <Introduce description={description} toggleMode={toggleDescView} />
        ) : (
          <EditIntroduce
            description={description}
            setDesc={setDesc}
            toggleMode={toggleDescView}
            descSubmitHandler={updateDescHandler}
          />
        )}
      </div>
    </>
  );
};

export default MyInfo;
