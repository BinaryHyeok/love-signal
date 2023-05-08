import style from "./styles/Introduce.module.scss";

type PropsType = {
  myIntroduce: string;
};

const MyIntroduce: React.FC<PropsType> = ({ myIntroduce }) => {
  return (
    <>
      <div className={style.introduceText}>{myIntroduce}</div>
    </>
  );
};

export default MyIntroduce;
