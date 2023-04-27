import style from "./RedHeartLine.module.scss";

const RedHeartLine = () => {
  return (
    <div className={style.line}>
      <img src="/assets/red_heart.png" />
      <img src="/assets/red_heart.png" />
      <img src="/assets/red_heart.png" />
    </div>
  );
};

export default RedHeartLine;
