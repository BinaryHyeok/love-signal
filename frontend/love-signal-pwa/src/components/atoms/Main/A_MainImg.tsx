import style from "./styles/A_MainImg.module.scss";

const MainImg = () => {
  return (
    <div className={style.mainImg}>
      <img src={`${process.env.REACT_APP_ASSETS_DIR}/main_logo_white.png`} />
    </div>
  );
};

export default MainImg;
