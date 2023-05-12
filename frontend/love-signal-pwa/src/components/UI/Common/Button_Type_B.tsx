import style from "./Button_Type_B.module.scss";
import { motion } from "framer-motion";

type propsType = {
  className?: string;
  margin: string;
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: any;
};

const Button_Type_B: React.FC<propsType> = ({
  className = "",
  margin,
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
      whileTap={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 200, damping: 10 },
      }}
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
    >
      {children}
    </motion.button>
  );
};

export default Button_Type_B;
