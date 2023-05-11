import { useState, useEffect } from "react";
import style from "./styles/MyInfo.module.scss";
import NickName from "./NickName";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";
import { useRecoilState } from "recoil";
import { myMemberUUID, myTeamUUID } from "../../../atom/member";
import { changeMyInfo } from "../../../api/auth";
import { myatk } from "../../../atom/member";
import { kid } from "../../../atom/member";

type propsType = {
  age: number;
  nickname: string;
  description: string;
};

const MyInfo: React.FC<propsType> = ({ age, nickname, description }) => {
  const [changeName, setChangeName] = useState<boolean>(true); //이름 바꿔줄 state
  //시작값이 nickname
  const [myNickName, setMyNickName] = useState<string>(nickname);
  const [changeIntroduce, setChangeIntroduce] = useState<boolean>(true); //자기소개 바꿔줄 state

  //시작값이 description
  const [myIntroduce, setMyIntroduce] = useState<string>(description);

  const [start, setStart] = useState<boolean>(true);

  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [applyInfo, setApplyInfo] = useState<boolean>(false);

  const [ATK] = useRecoilState<string>(myatk);
  const [KID] = useRecoilState<string>(kid);

  useEffect(() => {
    if (!start) {
      changeMyInfo(myUUID, myNickName, myIntroduce, ATK, KID)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setStart(false);
    }
  }, [applyInfo]);

  //최초 정보 불러오기
  useEffect(() => {
    setMyNickName(nickname);
    setMyIntroduce(description);
  }, [nickname, description]);

  return (
    <>
      <div className={style.container}>
        {changeName ? (
          <NickName
            age={age}
            nickname={myNickName}
            changeName={setChangeName}
          />
        ) : (
          <EditNickName
            age={age}
            nickname={myNickName}
            changeName={setChangeName}
            applyInfo={applyInfo}
            setApplyInfo={setApplyInfo}
            setMyNickName={setMyNickName}
          />
        )}

        {changeIntroduce ? (
          <Introduce
            myIntroduce={myIntroduce}
            changeIntroduce={setChangeIntroduce}
          />
        ) : (
          <EditIntroduce
            myIntroduce={myIntroduce}
            changeIntroduce={setChangeIntroduce}
            applyInfo={applyInfo}
            setApplyInfo={setApplyInfo}
            setMyIntroduce={setMyIntroduce}
          />
        )}
      </div>
    </>
  );
};

export default MyInfo;
