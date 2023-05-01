import { member } from "../../types/member";
import GenderImg from "./GenderImg";
import style from "./OtherTeamPicture.module.scss";

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
            <GenderImg index={index} />
          </>
        ))}
      </div>
    </>
  );
};

export default PictureBox;
