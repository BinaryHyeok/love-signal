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
  nickname: string;
  description: string;
};

const MyInfo: React.FC<propsType> = ({ nickname, description }) => {
  const [changeName, setChangeName] = useState<boolean>(true); //이름 바꿔줄 state

  //시작값이 nickname
  const [myNickName, setMyNickName] = useState<string>("김이슬");
  const [changeIntroduce, setChangeIntroduce] = useState<boolean>(true); //자기소개 바꿔줄 state

  //시작값이 description
  const [myIntroduce, setMyIntroduce] = useState<string>(
    "asssssssssssssssssssssssssssssssssssssss"
  );

  const [start, setStart] = useState<boolean>(true);

  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [applyInfo, setApplyInfo] = useState<boolean>(false);

  useEffect(() => {
    if (!start) {
      changeMyInfo(myUUID, myNickName, myIntroduce)
        .then((res) => {
          console.log("회원정보 수정완료");
        })
        .catch((err) => {
          console.log("수정에 실패했습니다.");
        });
    } else {
      setStart(true);
    }
  }, [applyInfo]);

  return (
    <>
      <div className={style.container}>
        {changeName ? (
          <NickName nickname={myNickName} changeName={setChangeName} />
        ) : (
          <EditNickName
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
