import style from "./styles/Header.module.scss";
import A_Logo from "../../atoms/Header/A_Logo";
import A_Alarm from "../../atoms/Header/A_Alarm";
import { motion } from "framer-motion";

type PropsType = { onClick: () => void; openManual: () => void };

const Header: React.FC<PropsType> = ({ onClick, openManual }) => {
  return (
    <div className={`${style.container} common-bg`}>
      <div className={style.content}>
        <A_Logo />
        <div className={style.iconContainer}>
          <motion.div
            whileTap={{
              scale: 1.15,
              transition: { type: "spring", stiffness: 200, damping: 10 },
            }}
            className={style.question}
            onClick={openManual}
          >
            ?
          </motion.div>
          <A_Alarm onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default Header;
