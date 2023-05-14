import style from "./styles/Header.module.scss";
import A_Logo from "../../atoms/Header/A_Logo";
import A_Alarm from "../../atoms/Header/A_Alarm";

type PropsType = { onClick: () => void };

const Header: React.FC<PropsType> = ({ onClick }) => {
  return (
    <div className={`${style.container} common-bg`}>
      <div className={style.content}>
        <A_Logo />
        <A_Alarm onClick={onClick} />
      </div>
    </div>
  );
};

export default Header;
