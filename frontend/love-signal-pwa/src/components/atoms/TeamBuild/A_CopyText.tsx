import style from "./styles/A_CopyText.module.scss";

type PropsType = {
  children: any;
};

const A_CopyText: React.FC<PropsType> = ({ children }) => {
  return (
    <div className={style.container}>
      <div className={style.text}>{children}</div>
    </div>
  );
};

export default A_CopyText;
