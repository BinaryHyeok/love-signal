import style from "./CheckTeam.module.scss";
import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import ButtonTypeA from "../../Common/Button_Type_A";
import { member } from "../../../../types/member";
import { applyMeeting } from "../../../../api/team";
import { myTeamUUID } from "../../../../atom/member";

import UserInfo from "./O_UserInfo";
import SwiperManual from "./A_SwiperManual";
import Exit from "./A_Exit";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

type propsType = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  member: member[];
  oppositeTeamUUID: string;
  myTeam: boolean; //내팀일 경우엔 밑에 버튼을 띄우면 안될것 같아 사용.
  setMsg: Dispatch<SetStateAction<string>>;
  applyModal: boolean;
  setApplyModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const CheckTeam: React.FC<propsType> = ({
  setVisible,
  member,
  oppositeTeamUUID,
  myTeam,
  setMsg,
  applyModal,
  setApplyModal,
  children,
}) => {
  const [myUUID] = useRecoilState<string>(myTeamUUID); //현재는 사용안하지만 이후에 사용예정.
  const [btnVisible, setBtnVisible] = useState<boolean>(false);

  const [close, setClose] = useState(false);

  useEffect(() => {
    setBtnVisible(!myTeam);
  }, []);

  const closeModal = () => {
    setVisible(false);
  };

  const closeLeft = () => {
    setClose(!close);
  };

  const closeManual = () => {
    setClose(true);
  };

  //공유하기 버튼
  const shareTeam = () => {
    alert("임시 공유하기 버튼 함수입니다.");
  };

  //신청하기 버튼
  const applyTeam = () => {
    applyMeeting("49a4f23f-1d5e-44bb-9eeb-473bbaf79b0a", oppositeTeamUUID)
      .then((res) => {
        setMsg(res.data.body);
        setApplyModal(true);
        console.log(applyModal);
      })
      .catch((err) => {
        setMsg(err.response.data.message);
        setApplyModal(true);
        console.log(applyModal);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.background} onClick={closeModal}></div>
      <motion.div
        className={style.modal}
        initial={{
          opacity: 0,
          scale: 0.6,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            ease: "easeOut",
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
          scale: 0.6,
          transition: {
            ease: "easeIn",
            duration: 0.7,
          },
        }}
      >
        <Exit closeModal={closeModal} />
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          onSlideChange={closeManual}
          loop={true}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className={style.swiper}
        >
          <SwiperSlide className={style.swiperSlide}>
            <UserInfo
              profileImage={member[0].profileImage}
              nickname={member[0].nickname}
              age={member[0].age}
              description={member[0].description}
            />
            {!close && <SwiperManual closeLeft={closeLeft} />}
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <UserInfo
              profileImage={member[1].profileImage}
              nickname={member[1].nickname}
              age={member[1].age}
              description={member[1].description}
            />
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <UserInfo
              profileImage={member[2].profileImage}
              nickname={member[2].nickname}
              age={member[2].age}
              description={member[2].description}
            />
          </SwiperSlide>
        </Swiper>
        {btnVisible ? (
          <div className={style.bottomContainer}>
            <div className={style.buttonContainer}>
              <ButtonTypeA
                width="104px"
                height="32px"
                background="#CAD9FF"
                className={style.button}
                onClick={shareTeam}
              >
                <img src="/assets/share.png" alt="" />
              </ButtonTypeA>
              <ButtonTypeA
                width="104px"
                height="32px"
                background="#FBCED3"
                onClick={applyTeam}
              >
                <img src="/assets/send_invite.png" alt="" />
              </ButtonTypeA>
            </div>
            {children}
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </div>
  );
};

export default CheckTeam;
