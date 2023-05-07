import style from "./Button_Type_A.module.scss";
import { motion } from "framer-motion";

type propsType = {
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
    <motion.button
      className={`${style.button} ${className}`}
      style={{
        width: `${width}`,
        height: `${height}`,
        background: `${background}`,
        borderRadius: `${borderRadius}`,
      }}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 1.2 }}
    >
      {children}
    </motion.button>
  );
};

export default Button_Type_A;
