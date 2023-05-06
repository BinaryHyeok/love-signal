import style from "./CheckTeam.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
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

type propsType = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  visible: boolean;
  member: member[];
  oppositeTeamUUID: string;
};

const CheckTeam: React.FC<propsType> = ({
  setVisible,
  visible,
  member,
  oppositeTeamUUID,
}) => {
  const [myUUID] = useRecoilState<string>(myTeamUUID);

  const [close, setClose] = useState(false);

  const closeModal = () => {
    setVisible(!visible);
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
    applyMeeting(myUUID, oppositeTeamUUID)
      .then((res) => {
        console.log(res);
        console.log("신청완료.");
      })
      .catch((err) => {
        console.log(err);
        console.log("신청이 안됐네..");
      });
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
      </div>
    </div>
  );
};

export default CheckTeam;
