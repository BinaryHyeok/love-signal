import { useState, useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";
// import { inquireMember } from "../../../api/auth";

import { myMemberUUID } from "../../../atom/member";
import { withdrawMember } from "../../../api/auth";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { test } from "../../../api/sseul2";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [, guraImage] = useState<FormData>(new FormData());
  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    test("5d91b34f-9e09-4cc6-a944-40aed226311d").then((MyInfo) => {
      console.log(MyInfo);
      console.log(MyInfo.data.body.description);

      console.log(MyInfo.data.body.profileImage);
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
    });
  }, [setIdx]);

  const [myUUID] = useRecoilState<string>(myMemberUUID);

  //회원탈퇴 함수입니다.
  const withdrawal = () => {
    withdrawMember(myUUID)
      .then((err) => {})
      .catch((err) => {});
  };

  return (
    <>
      <div className={style.myPageContainer}>
        <div className={style.scrollContainer}>
          <M_Image_Type myImg={myImg} marginTop="8px" setMyImage={guraImage} />
          <MyInfo
            age={myAge}
            nickname={myNickName}
            description={myDescription}
          />
          <div className={style.drawal}>
            <Button_Type_A width="100%">로그아웃</Button_Type_A>
          </div>
          <div className={style.drawal2}>
            <Button_Type_A width="100%" onClick={withdrawal}>
              회원탈퇴
            </Button_Type_A>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
