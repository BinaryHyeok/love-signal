import { useState } from "react";
import style from "./styles/M_FindTeamMenuList.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CommonModal from "../../UI/Modal/CommonModal";

const M_FindTeamMenuList = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const openRoomCodeModalHandler = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div className={style.menuList}>
        <Button_Type_A className={style.menu}>
          <img src="/assets/LIGHTENING.png" />
          빠른 매칭 <img src="/assets/LIGHTENING.png" />
        </Button_Type_A>
        <Button_Type_A
          className={style.menu}
          onClick={openRoomCodeModalHandler}
        >
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
            <Button_Type_A width="120px" height="40px" background="#CAD9FF">
              입장하기
            </Button_Type_A>
          </CommonModal>
        </Modal_portal>
      )}
    </>
  );
};

export default M_FindTeamMenuList;
