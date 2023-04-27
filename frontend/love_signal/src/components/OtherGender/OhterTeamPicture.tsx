import { memberType } from "../../types/member";
import style from "./OtherTeamPicture.module.scss";

type propsType = {
  viewDetail: (idx: number) => void;
  idx: number;
  item: memberType;
};

const PictureBox: React.FC<propsType> = ({ viewDetail, idx, item }) => {
  return (
    <>
      <div className={style.otherPicture} onClick={() => viewDetail(idx)}>
        {item.map((Image, index) => (
          <>
            <img
              key={index}
              src={Image.imgload}
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
