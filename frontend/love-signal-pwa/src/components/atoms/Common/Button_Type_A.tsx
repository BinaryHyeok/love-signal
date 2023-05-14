import style from "./styles/Button_Type_A.module.scss";
import { motion, AnimatePresence } from "framer-motion";

type propsType = {
  margin?: string;
  className?: string;
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: any;
};

const Button_Type_A: React.FC<propsType> = ({
  margin,
  className = "",
  width,
  height,
  background,
  borderRadius,
  onClick,
  disabled,
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.button
        className={`${style.button} ${className}`}
        style={{
          margin: `${margin}`,
          width: `${width}`,
          height: `${height}`,
          background: `${background}`,
          borderRadius: `${borderRadius}`,
        }}
        onClick={onClick}
        disabled={disabled}
        whileTap={{
          scale: 1.05,
          transition: { type: "spring", stiffness: 200, damping: 10 },
        }}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  );
};

export default Button_Type_A;
