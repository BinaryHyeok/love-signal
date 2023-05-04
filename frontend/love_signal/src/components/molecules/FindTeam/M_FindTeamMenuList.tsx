import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles/M_FindTeamMenuList.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CommonModal from "../../UI/Modal/CommonModal";
import M_ModalFindTeamWithCode from "./M_ModalFindTeamWithCode";
import { create } from "domain";

const M_FindTeamMenuList = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);

  //모달창이 닫혔을때 다시 입장하기 버튼을 클릭할수 있도록 의존성 추가.
  useEffect(() => {}, [visible]);

  //모달창 열어주는 함수입니다.
  const openRoomCodeModalHandler = () => {
    setVisible(!visible);
  };

  //입장하기 클릭시 코드를 작성할 수 있도록 해주는 InputBox를 열어주는 함수.
  const writeTeamCode = () => {};

  //팀으로 입장.(임시);
  const enterTeam = () => {
    //여기에서 axios요청을해서 해당 팀으로 입장.
    navigate("/Samegender/MyTeam");
  };

  // 새로운 방을 생성해서 이동
  const createRoom = () => {
    // 요청이 끝날 때까지 로딩화면
    navigate("/loading");
    // 새로운 방을 생성하기 위한 axios 요청이 완료되면 이동(비동기 통신 종료 시)
    setTimeout(() => {
      navigate("/samegender/build");
    }, 3000);
  };

  return (
    <>
      <div className={style.menuList}>
        <Button_Type_A className={style.menu}>
          <img src="/assets/LIGHTENING.png" />
          빠른 매칭 <img src="/assets/LIGHTENING.png" />
        </Button_Type_A>
        <Button_Type_A className={style.menu} onClick={createRoom}>
          <img src="/assets/SWEET_HOME.png" />
          룸 생성하기
          <img src="/assets/SWEET_HOME.png" />
        </Button_Type_A>
        <Button_Type_A
          className={style.menu}
          onClick={openRoomCodeModalHandler}
        >
          <img src="/assets/KEY.png" />
          룸 검색하기
          <img src="/assets/KEY.png" />
        </Button_Type_A>
      </div>
      {visible && (
        <Modal_portal>
          <CommonModal
            setVisible={setVisible}
            visible={visible}
            width="304px"
            height="200px"
          >
            <M_ModalFindTeamWithCode enterTeam={enterTeam} />
          </CommonModal>
        </Modal_portal>
      )}
    </>
  );
};

export default M_FindTeamMenuList;
