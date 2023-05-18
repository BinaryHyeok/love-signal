import style from "./styles/A_LoadingTopHeart.module.scss";

const A_LoadingTopHeart = () => {
  return (
    <div className={style.topheart}>
      <img src={`${process.env.REACT_APP_ASSETS_DIR}/loadingheart.png`} />
    </div>
  );
};

export default A_LoadingTopHeart;
