import { useState, useEffect } from "react";
import style from "./styles/MyInfo.module.scss";
import NickName from "./NickName";
import Introduce from "./Introduce";
import EditNickName from "./EditNickName";
import EditIntroduce from "./EditIntroduce";
import { useRecoilState } from "recoil";
import { myMemberUUID } from "../../../atom/member";
import { changeMyInfo } from "../../../api/auth";

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

  useEffect(() => {
    if (!start) {
      //내정보 수정.(이슬 담당)
      changeMyInfo(
        "f6fc66c4-34cb-4f0d-ab89-34a974917654",
        myNickName,
        myIntroduce
      )
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
