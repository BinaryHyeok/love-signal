import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

import { contentVariants } from "../../atoms/Common/contentVariants";

import style from "./styles/Mypage.module.scss";

import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "../../templates/Mypage/MyInfo";

import { inquireMember } from "../../../api/auth";
import { changeMyImg } from "../../../api/file";

import { footerIdx } from "../../../atom/footer";
import { kid, myMemberUUID } from "../../../atom/member";
import { myatk } from "../../../atom/member";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [changeImg, setChangeImg] = useState<boolean>(false); //changeImg가 true면 이미지 바뀐것. 언젠간 쓰지않을까.
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myCropImage, setMyCropImage] = useState<FormData>(new FormData());
  const [start, setStart] = useState<boolean>(false);

  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(UUID, atk, kID).then((MyInfo) => {
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
    });
  }, [setIdx]);

  useEffect(() => {
    if (start) {
      changeMyImg(UUID, myCropImage, atk, kID);
    } else {
      setStart(true);
    }
  }, [myCropImage]);

  return (
    <ATKFilter>
      <GetMyInfo>
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
              mynickname={myNickName}
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
      </GetMyInfo>
    </ATKFilter>
  );
};

export default Mypage;
