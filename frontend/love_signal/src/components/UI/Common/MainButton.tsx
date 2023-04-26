import style from "./MainButton.module.scss";

const MainButton = (props: any) => {
  return <button className={style.button}>{props.children}</button>;
};

export default MainButton;
