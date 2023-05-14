import style from "./styles/A_ChatHeaderExit.module.scss";

type PropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const A_ChatHeaderExit: React.FC<PropsType> = ({ onClick }) => {
  return (
    <button className={style.btnExit} onClick={onClick}>
      <img src={`${process.env.REACT_APP_ASSETS_DIR}/back_arrow.png`} />
    </button>
  );
};

export default A_ChatHeaderExit;
