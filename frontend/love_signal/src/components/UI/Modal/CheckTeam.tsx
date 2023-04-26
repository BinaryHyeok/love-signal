import style from "./CheckTeam.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import Button_Type_A from "../Common/Button_Type_A";

const CheckTeam = () => {
  return (
    <div className={style.container}>
      <div className={style.background}></div>
      <div className={style.modal}>
        <Swiper
          pagination={{
            type: "progressbar",
          }}
          loop={true}
          // navigation={true}
          modules={[Pagination, Navigation]}
          className={style.swiper}
        >
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/selfieSample.jpg" />
            <div className={style.profileBlack}>test</div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/selfieSample2.jpg" />
            <div className={style.profileBlack}>test</div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/selfieSample3.jpg" />
            <div className={style.profileBlack}>test</div>
          </SwiperSlide>
        </Swiper>
        <div className={style.buttonContainer}>
          <Button_Type_A
            width="104px"
            height="32px"
            background="#CAD9FF"
            className={style.button}
          >
            <img src="/assets/share.png" />
          </Button_Type_A>
          <Button_Type_A width="104px" height="32px" background="#FBCED3">
            <img src="/assets/send_invite.png" />
          </Button_Type_A>
        </div>
      </div>
    </div>
  );
};

export default CheckTeam;
