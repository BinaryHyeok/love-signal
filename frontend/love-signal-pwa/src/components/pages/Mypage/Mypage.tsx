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
import AlertBtn from "../../atoms/Common/AlertBtn";
import Modal_portal from "../../UI/Modal/Modal_portal";
import ModalBox from "../../UI/Modal/Common/ModalBox";
import Button_Type_A from "../../atoms/Common/Button_Type_A";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);
  const [myAge, setMyAge] = useState<number>(0);
  const [myImg, setMyImg] = useState<string>("");
  const [changeImg, setChangeImg] = useState<boolean>(false); //changeImg가 true면 이미지 바뀐것. 언젠간 쓰지않을까.
  const [myNickName, setMyNickName] = useState<string>("");
  const [myDescription, setMyDescription] = useState<string>("");
  const [myAlarm, SetMyAlarm] = useState<boolean>(false);
  const [myCropImage, setMyCropImage] = useState<FormData>(new FormData());
  const [start, setStart] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [animation, setAnimation] = useState<boolean>(false);

  const [UUID] = useRecoilState<string>(myMemberUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [name, setName] = useState<string>("");

  useEffect(() => {
    setIdx(3);
    //수정할 내 정보들을 가져와서 보여주기.
    inquireMember(UUID, atk, kID).then((MyInfo) => {
      setMyAge(MyInfo.data.body.age);
      setMyImg(MyInfo.data.body.profileImage);
      setMyNickName(MyInfo.data.body.nickname);
      setMyDescription(MyInfo.data.body.description);
      SetMyAlarm(MyInfo.data.body.receiveAlarm);
    });
    if (window.location.hostname === "localhost") {
      setName("/local");
    }
  }, [UUID, atk, kID]);

  useEffect(() => {
    if (start) {
      alert(myCropImage);
      changeMyImg(UUID, myCropImage, atk, kID)
        .then(() => {
          inquireMember(UUID, atk, kID).then((res) => {
            setMyImg(res.data.body.profileImage);
          });
        })
        .catch((err) => {
          setImgError(!imgError);
          setVisible(true);
          alert("나는 이미지야." + err);
          //이거 그냥 모달창으로 처리하겠음. 실패했을시 모달창으로 이미지등록에 실패하였습니다를 띄우겠습니다.
        });
    } else {
      setStart(true);
    }
  }, [myCropImage]);

  const closeModal = () => {
    setAnimation(true);
    setVisible(false);
  };

  return (
    <ATKFilter>
      <GetMyInfo>
        {visible ? (
          <Modal_portal>
            <div className={style.bgContainer}>
              <div
                className={`${style.background} ${
                  animation ? `${style.disappear}` : ""
                }`}
                onClick={closeModal}
              />
              <ModalBox
                animation={animation}
                visible={visible}
                closeModal={closeModal}
                width="320px"
                height="250px"
              >
                <div className={style.desc}>
                  <div className={style.desc1}>이미지 등록 실패</div>
                  <Button_Type_A
                    width="80%"
                    height="40px"
                    background="#BCC5F0"
                    onClick={closeModal}
                  >
                    확인
                  </Button_Type_A>
                </div>
              </ModalBox>
            </div>
          </Modal_portal>
        ) : (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            // exit="exit"
            className={style.myPageContainer}
          >
            {/* <AlertBtn /> */}
            <div className={style.scrollContainer}>
              <M_Image_Type
                myImg={myImg}
                marginTop="8px"
                setMyImage={setMyCropImage}
                setChangeImg={setChangeImg}
                imgError={imgError}
              />
              <MyInfo
                age={myAge}
                mynickname={myNickName}
                description={myDescription}
                setNick={setMyNickName}
                setDesc={setMyDescription}
              />
              <AlertBtn
                UUID={UUID}
                myNick={myNickName}
                atk={atk}
                kID={kID}
                myAlarm={myAlarm}
                setMyAlarm={SetMyAlarm}
              />
              <motion.div
                whileTap={{
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 200, damping: 10 },
                }}
                className={style.logout}
              >
                <Link
                  to={`${process.env.REACT_APP_API_AUTH}/auth/kakao/logout${name}`}
                  className={style.link}
                >
                  로그아웃
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </GetMyInfo>
    </ATKFilter>
  );
};

export default Mypage;
