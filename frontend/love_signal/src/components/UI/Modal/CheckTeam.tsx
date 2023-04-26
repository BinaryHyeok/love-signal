import style from "./CheckTeam.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

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
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/selfieSample2.jpg" />
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/selfieSample3.jpg" />
          </SwiperSlide>
        </Swiper>
        <div className={style.buttonContainer}>
          <div>버튼</div>
          <div>버튼</div>
        </div>
      </div>
    </div>
  );
};

export default CheckTeam;
