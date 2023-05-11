import { useState, useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";
import { inquireMember, logout } from "../../../api/auth";

import { kid, myMemberUUID } from "../../../atom/member";
import { withdrawMember } from "../../../api/auth";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import { changeMyImg } from "../../../api/file";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { myatk } from "../../../atom/member";
import { myatkET } from "../../../atom/member";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [changeImg, setChangeImg] = useState<boolean>(false); //changeImg가 true면 이미지 바뀐것. 언젠간 쓰지않을까.
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myCropImage, setMyCropImage] = useState<FormData>(new FormData());
  const [start, setStart] = useState<boolean>(false);
  const [, setMyAtk] = useRecoilState<string>(myatk);
  const [, setMyAtkET] = useRecoilState<Date>(myatkET);

  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const navigate = useNavigate();

  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(UUID, atk, kID).then((MyInfo) => {
      console.log(MyInfo);
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
    });
  }, [setIdx]);

  //로그아웃 함수입니다.(종효 담당)
  const logOut = () => {
    //로그아웃시 없애야 할것
    //쿠키에 저장된 rtk삭제.
    //Recoil에 저장된 atk삭제.
    //Recoil에 저장된 만료기간 삭제.

    logout(atk, kID)
      .then((res) => {
        cookie.remove("rtk", { path: "/" });
        localStorage.removeItem("localStorage");
        navigate("/");
      })
      .catch((err) => {
        console.log("로그아웃 실패");
      });
  };

  //회원탈퇴 함수입니다.
  // const withdrawal = () => {
  //   withdrawMember(UUID)
  //     .then((err) => {})
  //     .catch((err) => {});
  // };

  useEffect(() => {
    if (start) {
      console.log(atk);
      console.log(kID);

      changeMyImg(UUID, myCropImage, atk, kID);
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
            setChangeImg={setChangeImg}
          />
          <MyInfo
            age={myAge}
            nickname={myNickName}
            description={myDescription}
          />
          <div className={style.drawal}>
            <Button_Type_A width="100%" onClick={logOut}>
              로그아웃
            </Button_Type_A>
          </div>
          {/* <div className={style.drawal2}>
            <Button_Type_A width="100%" onClick={withdrawal}>
              회원탈퇴
            </Button_Type_A>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Mypage;
