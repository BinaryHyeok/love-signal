import style from "./codepen.module.scss";

const Codepen = () => {
  //펄스 위아래로 사진이 들어가야하는건데.. 흠..
  return (
    <>
      <div className={style.heartContainer}>
        <div className={style.topheart}>
          <img src="/assets/loadingheart.png" />
        </div>
        <div className={style.bottomheart}>
          <img src="/assets/loadingheart.png" />
        </div>
      </div>
      <div className={style.pulse}></div>
    </>
  );
};

export default Codepen;
