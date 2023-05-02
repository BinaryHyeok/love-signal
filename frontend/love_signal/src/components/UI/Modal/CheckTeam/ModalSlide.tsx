import { SwiperSlide } from "swiper/react";
import style from "./ModalSlide.module.scss";
import UserInfo from "./O_UserInfo";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type propsType = {
  imgurl: string;
  nickname: string;
  age: number;
  description: string;
};

//현재 안쓰는 파일입니다.
const ModalSlide: React.FC<propsType> = ({
  imgurl,
  nickname,
  age,
  description,
}) => {
  return (
    <SwiperSlide className={style.swiperSlide}>
      <UserInfo
        imgurl={imgurl}
        nickname={nickname}
        age={age}
        description={description}
      />
    </SwiperSlide>
  );
};

export default ModalSlide;
