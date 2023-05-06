import style from "./ListBoxWithImgTitle.module.scss";

const ListBoxWithImgTitle = (props: any) => {
  return (
    <div className={`${style.listBox} ${props.type}-line`}>
      <div className={style.titleBox}>{props.title}</div>
      {props.children}
    </div>
  );
};

export default ListBoxWithImgTitle;
