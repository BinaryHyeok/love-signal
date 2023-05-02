import { member } from "../../../types/member";
import A_GenderImg from "../../atoms/OtherGender/A_GenderImg";
import style from "./styles/M_OtherTeamPicture.module.scss";

type propsType = {
  viewDetail: (idx: number) => void;
  idx: number;
  item: member[];
};

const PictureBox: React.FC<propsType> = ({ viewDetail, idx, item }) => {
  return (
    <>
      <div className={style.otherPicture} onClick={() => viewDetail(idx)}>
        {item.map((Image, index) => (
          <>
            <A_GenderImg index={index} />
          </>
        ))}
      </div>
    </>
  );
};

export default PictureBox;
