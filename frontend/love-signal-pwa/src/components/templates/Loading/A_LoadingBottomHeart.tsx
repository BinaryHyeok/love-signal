import style from "./styles/A_LoadingBottomHeart.module.scss";

const A_LoadingBottomHeart = () => {
  return (
    <div className={style.bottomheart}>
      <img src={`${process.env.REACT_APP_ASSETS_DIR}/loadingheart.png`} />
    </div>
  );
};

export default A_LoadingBottomHeart;
