import { useState, useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";
import { inquireMember } from "../../../api/auth";

import { myMemberUUID } from "../../../atom/member";
import { withdrawMember } from "../../../api/auth";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myImg, setMyImg] = useState<string>("");
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(myUUID)
      .then((res) => {
        setMyImg(res.data.body.imgload);
        setMyNickName(res.data.body.nickname);
        setMyDescription(res.data.body.description);
      })
      .catch((err) => {
        console.log(err);
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
        <M_Image_Type myImg={myImg} />
        <MyInfo nickname={myNickName} description={myDescription} />
      </div>
    </>
  );
};

export default Mypage;
