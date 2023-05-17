import style from "./styles/CheckTeam.module.scss";
import { useEffect, Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import Button_Type_A from "../../../atoms/Common/Button_Type_A";
import { member } from "../../../../types/member";
import { applyMeeting, getMyTeam } from "../../../../api/team";
import {
  imLeader,
  leftSwiper,
  myMemberUUID,
  myTeamUUID,
  myatk,
} from "../../../../atom/member";

import UserInfo from "../../../organisms/CheckTeamModal/O_UserInfo";
import SwiperManual from "../../../atoms/CheckTeamModal/A_SwiperManual";
import Exit from "../../../atoms/CheckTeamModal/A_Exit";
import { useRecoilState } from "recoil";
import { motion, AnimatePresence } from "framer-motion";
import { kid } from "../../../../atom/member";
import { shareTeam } from "../../../../api/chat";

type propsType = {
  timeout: any;
  animation: boolean;
  setAnimation: Dispatch<SetStateAction<boolean>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  member: member[];
  oppositeTeamUUID?: string;
  myTeam?: boolean; //내팀일 경우엔 밑에 버튼을 띄우면 안될것 같아 사용.
  setMsg: Dispatch<SetStateAction<string>>;
  applyModal?: boolean;
  setApplyModal: Dispatch<SetStateAction<boolean>>;
  haveTeam?: boolean;
  memberLength?: number;
  children?: React.ReactNode;
};

const CheckTeam: React.FC<propsType> = ({
  timeout,
  animation,
  setAnimation,
  setVisible,
  member,
  oppositeTeamUUID,
  myTeam,
  setMsg,
  applyModal,
  setApplyModal,
  haveTeam,
  memberLength,
  children,
}) => {
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [myTUUID] = useRecoilState<string>(myTeamUUID); //현재는 사용안하지만 이후에 사용예정.
  const [btnVisible, setBtnVisible] = useState<boolean>(false);
  const [applyActiveBtn, setApplyActiveBtn] = useState<boolean>(false);

  const [close, setClose] = useState<boolean>(false);
  const [shareBtn, setShareBtn] = useState<boolean>(false);

  const [isLeader] = useRecoilState<boolean>(imLeader);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [leftIsVisible, setLeftIsVisible] = useRecoilState<boolean>(leftSwiper);

  useEffect(() => {
    setBtnVisible(!myTeam);
    if (memberLength === 3 && !haveTeam && isLeader) {
      setApplyActiveBtn(true);
    } else {
      setApplyActiveBtn(false);
    }
    if (myTUUID) {
      setShareBtn(true);
    } else {
      setShareBtn(false);
    }
    console.log(member);
  }, []);

  const closeModal = () => {
    clearTimeout(timeout);
    setAnimation(true);
    timeout = setTimeout(() => setVisible(false), 400);
  };

  const closeLeft = () => {
    setClose(true);
    setLeftIsVisible(true);
  };

  const closeManual = () => {
    setClose(true);
    setLeftIsVisible(true);
  };

  //공유하기 버튼
  const shareTeamBtn = () => {
    if (oppositeTeamUUID) {
      shareTeam(myUUID, oppositeTeamUUID)
        .then((res) => {
          if (myTUUID) {
            getMyTeam(myTUUID, atk, kID).then((res) => {
              if (
                res.data.body.members.length === 3 ||
                res.data.body.haveMeetingTeam
              ) {
                setMsg("팀 채팅방에 공유되었습니다.");
              } else {
                setMsg("현재 팀 채팅방이 존재하지 않습니다.");
              }
            });
          } else {
            setMsg("현재 팀 채팅방이 존재하지 않습니다.");
          }
          setApplyModal(true);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //신청하기 버튼
  const applyTeam = () => {
    if (memberLength === 3 && !haveTeam && isLeader && oppositeTeamUUID) {
      applyMeeting(myTUUID, oppositeTeamUUID, atk, kID)
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
    } else {
      if (haveTeam) {
        setMsg("이미 상대팀이 존재 합니다");
      } else if (!isLeader) {
        setMsg("팀의 리더가 아닙니다.");
      } else if (memberLength !== 3) {
        setMsg("팀원이 가득차지 않았습니다.");
      }
      setApplyModal(true);
    }
  };

  //신고하기 버튼입니다
  const reportMember = () => {
    console.log("신고할거야");
  };

  return (
    <div className={`${style.container}`}>
      <div
        className={`${style.background} ${
          animation ? `${style.disappeared}` : ""
        }`}
        onClick={closeModal}
      ></div>
      <motion.div
        className={`${style.modal} ${animation ? `${style.disappear}` : ""}`}
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
      >
        <Exit closeModal={closeModal} />
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          onSlideChange={closeManual}
          loop={true}
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
            {!close && !leftIsVisible && <SwiperManual closeLeft={closeLeft} />}
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
              <Button_Type_A
                width="104px"
                height="32px"
                background={shareBtn ? "#CAD9FF" : "#CCCCCC"}
                className={style.button}
                onClick={shareTeamBtn}
              >
                {shareBtn ? (
                  <img
                    src={`${process.env.REACT_APP_ASSETS_DIR}/share.png`}
                    alt=""
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_ASSETS_DIR}/shareblack.png`}
                    alt=""
                  />
                )}
              </Button_Type_A>
              <Button_Type_A
                width="104px"
                height="32px"
                background={applyActiveBtn ? "#FBCED3" : "#CCCCCC"}
                onClick={applyTeam}
              >
                {applyActiveBtn ? (
                  <img
                    src={`${process.env.REACT_APP_ASSETS_DIR}/send_invite.png`}
                    alt=""
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_ASSETS_DIR}/send_blackinvite.png`}
                    alt=""
                  />
                )}
              </Button_Type_A>
            </div>
            {children}
          </div>
        ) : (
          <div className={style.bottomContainer}>
            <div
              className={style.buttonContainer}
              style={{ justifyContent: "center" }}
            >
              <Button_Type_A
                margin="auto 0"
                width="104px"
                height="32px"
                background="#FFFFDD"
                className={style.button}
                onClick={reportMember}
              >
                <img
                  src={`${process.env.REACT_APP_ASSETS_DIR}/report.png`}
                  alt="신고하기"
                />
              </Button_Type_A>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CheckTeam;
