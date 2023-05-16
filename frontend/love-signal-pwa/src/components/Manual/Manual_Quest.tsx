import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import style from "./Manual_Quest.module.scss";

import "swiper/css";
import "swiper/css/pagination";
import "./Manual.css";

import { Pagination, Mousewheel } from "swiper";

import ManualImg from "./ManualImg";
import ManualText1 from "./ManualText1";
import ManualText2 from "./ManualText2";
import ManualText3 from "./ManualText3";
import ManualText4 from "./ManualText4";
import ManualText5 from "./ManualText5";
import ManualTitle from "./ManualTitle";

const Manual_Quest = () => {
  return (
    <div className={style.container}>
      <Swiper
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        mousewheel={{
          invert: true,
        }}
        modules={[Pagination, Mousewheel]}
        className="mySwiper"
      >
        <SwiperSlide className={style.swiperSlide}>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText1 />
            <ManualImg num="1" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText2 />
            <ManualImg num="2" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText3 />
            <ManualImg num="3" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText4 />
            <ManualImg num="4" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText5 />
            <ManualImg num="5" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Manual_Quest;
