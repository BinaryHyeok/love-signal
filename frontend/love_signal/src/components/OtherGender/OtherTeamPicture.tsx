import { member } from "../../types/member";
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
            <img
              key={index}
              src="/assets/girl1.png"
              alt="이성이미지"
              className={style.humanPicture}
            />
          </>
        ))}
      </div>
    </>
  );
};

export default PictureBox;
