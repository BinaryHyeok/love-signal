import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";
import ATKFilter from "../../Filter/ATKFilter";
import GetMyInfo from "../../Filter/GetMyInfo";

import { contentVariants } from "../../atoms/Common/contentVariants";

import style from "./styles/Mypage.module.scss";

import M_Image_Type from "../../molecules/Common/M_Image_Type";
import MyInfo from "../../templates/Mypage/MyInfo";

import { inquireMember } from "../../../api/auth";
import { changeMyImg } from "../../../api/file";

import { footerIdx } from "../../../atom/footer";
import { kid, myMemberUUID } from "../../../atom/member";
import { myatk } from "../../../atom/member";
import {
  fetchPWAToken,
  requestPushPermission,
  sendFCMToken,
} from "../../../api/pwa";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

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

  // 푸시알림 관련 테스트 코드
  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_PUSH_VAPID,
      authDomain: process.env.REACT_APP_PUSH_DOMAIN,
      projectId: process.env.REACT_APP_PUSH_PROJECT_ID,
      storageBucket: process.env.REACT_APP_PUSH_PROCESS_BUCKET,
      messagingSenderId: process.env.REACT_APP_PUSH_SENDER_ID,
      appId: process.env.REACT_APP_PUSH_APP_ID,
      measurementId: process.env.REACT_APP_PUSH_MEASUREMENT,
    };
    const app = initializeApp(firebaseConfig);

    requestPushPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("푸시알림 권한이 허용되었습니다");
          fetchPWAToken(getMessaging(app))
            .then((token) => {
              console.log(token);
              sendFCMToken(UUID, atk, kID, token);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          console.log("푸시알림 허용 X");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(UUID, atk, kID).then((MyInfo) => {
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
    });
  }, [UUID, atk, kID]);

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
