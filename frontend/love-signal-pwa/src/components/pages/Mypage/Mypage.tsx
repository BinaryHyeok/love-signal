import { useState, useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";
import { inquireMember } from "../../../api/auth";

import { myMemberUUID } from "../../../atom/member";
import { withdrawMember } from "../../../api/auth";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { changeMyImg } from "../../../api/file";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myCropImage, setMyCropImage] = useState<FormData>(new FormData());
  const [start, setStart] = useState<boolean>(false);
  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember("f6fc66c4-34cb-4f0d-ab89-34a974917654").then((MyInfo) => {
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

  useEffect(() => {
    if (start) {
      changeMyImg("f6fc66c4-34cb-4f0d-ab89-34a974917654", myCropImage);
    } else {
      setStart(true);
    }
  }, [myCropImage]);

  return (
    <>
      <div className={style.myPageContainer}>
        <div className={style.scrollContainer}>
          <M_Image_Type
            myImg={myImg}
            marginTop="8px"
            setMyImage={setMyCropImage}
          />
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
