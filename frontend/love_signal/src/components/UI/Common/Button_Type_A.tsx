import style from "./Button_Type_A.module.scss";

const Button_Type_A = (props: any) => {
  return (
    <button
      className={`${style.button} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button_Type_A;
