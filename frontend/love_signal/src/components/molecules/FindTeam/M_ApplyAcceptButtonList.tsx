import style from "./styles/M_ApplyAcceptButtonList.module.scss";
import Button_Type_A from "../../UI/Common/Button_Type_A";
import A_ApplyAcceptButton from "../../atoms/MyTeam/A_ApplyAcceptButton";
import A_ApplyRejectButton from "../../atoms/MyTeam/A_ApplyRejectButton";

const M_ApplyAcceptButtonList = () => {
  return (
    <ul className={style.acceptBtnList}>
      <A_ApplyAcceptButton />
      <A_ApplyRejectButton />
    </ul>
  );
};

export default M_ApplyAcceptButtonList;
