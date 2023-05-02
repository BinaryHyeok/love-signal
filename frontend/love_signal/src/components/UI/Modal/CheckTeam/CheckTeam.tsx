import style from "./CheckTeam.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

import ButtonTypeA from "../../Common/Button_Type_A";
import { member } from "../../../../types/member";

import UserInfo from "./O_UserInfo";
import SwiperManual from "./A_SwiperManual";
import Exit from "./A_Exit";

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
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    console.log("나 실행되냐?");
  };

  return (
    <div className={style.container}>
      <div className={style.background} onClick={closeModal}></div>
      <div className={style.modal}>
        <Exit closeModal={closeModal} />
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
            <UserInfo
              imgurl="/assets/girl1.png"
              nickname={member[0].nickname}
              age={member[0].age}
              description={member[0].description}
            />
            {!close && <SwiperManual closeLeft={closeLeft} />}
          </SwiperSlide>
          <SwiperSlide
            className={style.swiperSlide}
            onMouseDown={handleMouseDown}
          >
            <UserInfo
              imgurl="/assets/girl2.png"
              nickname={member[1].nickname}
              age={member[1].age}
              description={member[1].description}
            />
          </SwiperSlide>
          <SwiperSlide className={style.swiperSlide}>
            <UserInfo
              imgurl="/assets/girl3.png"
              nickname={member[2].nickname}
              age={member[2].age}
              description={member[2].description}
            />
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
