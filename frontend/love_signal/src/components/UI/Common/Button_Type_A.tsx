import style from "./Button_Type_A.module.scss";

const Button_Type_A = (props: any) => {
  return (
    <button
      className={`${style.button} ${props.className}`}
      style={{
        width: `${props.width}`,
        height: `${props.height}`,
        background: `${props.background}`,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button_Type_A;
