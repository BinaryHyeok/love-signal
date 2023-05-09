import style from "./Header.module.scss";
import A_Logo from "./A_Logo";
import A_Alarm from "./A_Alarm";

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
