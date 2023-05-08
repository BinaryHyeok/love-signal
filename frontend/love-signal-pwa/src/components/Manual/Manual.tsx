import style from "./Manual.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";

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
import ManualText6 from "./ManualText6";
import ManualTitle from "./ManualTitle";
import { useNavigate } from "react-router-dom";

const Manual = () => {
  const navigate = useNavigate();
  const goToMain = () => {
    navigate("/OtherGender");
  };
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cellphoneModal}>
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
            <SwiperSlide>
              <div className={style.modalContainer} onClick={goToMain}>
                <ManualTitle />
                <ManualText6 />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Manual;
