import style from "./ManualImg.module.scss";

type propsType = {
  num: string;
};

const ManualImg: React.FC<propsType> = ({ num }) => {
  return (
    <>
      <img
        src={`${process.env.REACT_APP_ASSETS_DIR}/manual${num}.png`}
        alt="메뉴얼"
        className={style.manual}
      />
    </>
  );
};

export default ManualImg;
