import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

import { contentVariants } from "../../atoms/Common/contentVariants";

import style from "./styles/Mypage.module.scss";

import M_Image_Type from "../../UI/Common/M_Image_Type";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import MyInfo from "./MyInfo";

import { inquireMember } from "../../../api/auth";
import { changeMyImg } from "../../../api/file";

import { footerIdx } from "../../../atom/footer";
import { kid, myMemberUUID } from "../../../atom/member";
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
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        // exit="exit"
        className={style.myPageContainer}
      >
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
            setNick={setMyNickName}
            setDesc={setMyDescription}
          />
          <div className={style.logout}>
            <Link
              to={`${process.env.REACT_APP_API_AUTH}/auth/kakao/logout`}
              className={style.link}
            >
              로그아웃
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Mypage;
