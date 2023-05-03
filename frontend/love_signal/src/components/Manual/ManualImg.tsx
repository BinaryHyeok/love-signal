import style from "./ManualImg.module.scss";

type propsType = {
  num: string;
};

const ManualImg: React.FC<propsType> = ({ num }) => {
  return (
    <>
      <img
        src={`/assets/manual${num}.png`}
        alt="메뉴얼"
        className={style.manual}
      />
    </>
  );
};

export default ManualImg;
