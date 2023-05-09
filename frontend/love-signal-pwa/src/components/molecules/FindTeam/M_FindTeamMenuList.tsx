import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./styles/M_FindTeamMenuList.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CommonModal from "../../UI/Modal/CommonModal";
import M_ModalFindTeamWithCode from "./M_ModalFindTeamWithCode";
import { joinTeam } from "../../../api/team";
import { myMemberUUID } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { makeTeam } from "../../../api/team";
import LoadingSpinner from "../../UI/Loading/LoadingSpinner";

import { AnimatePresence } from "framer-motion";

const M_FindTeamMenuList = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [myUUID] = useRecoilState<string>(myMemberUUID);
  const [enterTeamUUID, setEnterTeamUUID] = useState<string>("");

  //모달창이 닫혔을때 다시 입장하기 버튼을 클릭할수 있도록 의존성 추가.
  useEffect(() => {}, [visible]);

  //모달창 열어주는 함수입니다.
  const openRoomCodeModalHandler = () => {
    setVisible(true);
  };

  //팀으로 입장.(임시);
  const enterTeam = () => {
    //여기에서 axios요청을해서 해당 팀으로 입장.
    joinTeam(myUUID, enterTeamUUID)
      .then((res) => {})
      .catch((err) => {});
  };

  // 새로운 방을 생성해서 이동
  const createRoom = () => {
    setIsPending(true);
    makeTeam(myUUID)
      .then((res) => {
        console.log(res.data); // 방 정보
        setIsPending(false);
        navigate("/SameGender/build");
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
        navigate("/SameGender/build"); // 임시
      });
  };

  return (
    <>
      {isPending && (
        <Modal_portal>
          <LoadingSpinner />
        </Modal_portal>
      )}
      {!isPending && (
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
      )}
      {visible && (
        <Modal_portal>
          <CommonModal
            setVisible={setVisible}
            visible={visible}
            width="304px"
            height="200px"
          >
            <M_ModalFindTeamWithCode
              enterTeam={enterTeam}
              setEnterTeamUUID={setEnterTeamUUID}
            />
          </CommonModal>
        </Modal_portal>
      )}
    </>
  );
};

export default M_FindTeamMenuList;
