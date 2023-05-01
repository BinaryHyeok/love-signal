import style from "./CheckTeam.module.scss";
import { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import Button_Type_A from "../Common/Button_Type_A";
import { member } from "../../../types/member";

type propsType = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  member: member[];
};

const CheckTeam: React.FC<propsType> = ({ setVisible, visible, member }) => {
  console.log(member);

  const closeModal = () => {
    setVisible(!visible);
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
          <SwiperSlide className={style.swiperSlide}>
            <div>
              <img src="/assets/girl1.png" />
            </div>
            <div></div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/girl2.png" />
            <div></div>
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <img src="/assets/girl3.png" />
            <div></div>
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
