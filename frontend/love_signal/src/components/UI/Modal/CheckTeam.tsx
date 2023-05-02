import style from "./CheckTeam.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import ButtonTypeA from "../Common/Button_Type_A";
import { member } from "../../../types/member";

type propsType = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  member: member[];
};

const CheckTeam: React.FC<propsType> = ({ setVisible, visible, member }) => {
  console.log(member);

  const [close, setClose] = useState(false);

  const closeModal = () => {
    setVisible(!visible);
  };

  const closeLeft = () => {
    setClose(!close);
    console.log("나 왜 동작안하냐?");
  };

  return (
    <div className={style.container}>
      <div className={style.background} onClick={closeModal}></div>
      <div className={style.modal}>
        <img
          src="/assets/exit.png"
          className={style.exit}
          alt="나가기"
          onClick={closeModal}
        />
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          loop={true}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className={style.swiper}
        >
          <SwiperSlide
            className={style.swiperSlide}
            style={{ borderRadius: "10px" }}
          >
            <div className={style.image}>
              <img src="/assets/girl1.png" alt="" />
            </div>
            {!close && (
              <div className={style.swipeLeft} onClick={closeLeft}>
                <div className={style.swipeLetter}>
                  <b>왼쪽</b>으로 넘기면
                </div>
                <div className={style.swipeLetter}>
                  <b>다른 팀원</b>들을 볼 수 있어요
                </div>
                <div className={style.swipeLeftIcon}>
                  <img src="/assets/swipe_left.png" alt="" />
                </div>
              </div>
            )}
            <div className={style.profileBlack}>
              <div className={style.profileText}>
                <div>
                  <b>{member[0].nickname}</b>
                  <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                    {member[0].age}
                  </span>
                </div>
                <div className={style.description}>{member[0].description}</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <div className={style.image} onMouseDown={closeLeft}>
              <img src="/assets/girl2.png" alt="" />
            </div>
            <div className={style.profileBlack}>
              <div className={style.profileText}>
                <div>
                  <b>{member[1].nickname}</b>
                  <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                    {member[1].age}
                  </span>
                </div>
                <div className={style.description}>{member[1].description}</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <div className={style.image} onMouseDown={closeLeft}>
              <img src="/assets/girl3.png" alt="" />
            </div>
            <div className={style.profileBlack}>
              <div className={style.profileText}>
                <div>
                  <b>{member[2].nickname} </b>
                  <span style={{ fontSize: "16px", marginLeft: "8px" }}>
                    {member[2].age}
                  </span>
                </div>
                <div className={style.description}>{member[2].description}</div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className={style.buttonContainer}>
          <ButtonTypeA
            width="104px"
            height="32px"
            background="#CAD9FF"
            className={style.button}
          >
            <img src="/assets/share.png" alt="" />
          </ButtonTypeA>
          <ButtonTypeA width="104px" height="32px" background="#FBCED3">
            <img src="/assets/send_invite.png" alt="" />
          </ButtonTypeA>
        </div>
      </div>
    </div>
  );
};

export default CheckTeam;
