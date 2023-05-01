import style from "./styles/A_ChatHeaderExit.module.scss";

type PropsType = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const A_ChatHeaderExit: React.FC<PropsType> = ({ onClick }) => {
  return (
    <button className={style.btnExit} onClick={onClick}>
      {"<"}
    </button>
  );
};

export default A_ChatHeaderExit;
