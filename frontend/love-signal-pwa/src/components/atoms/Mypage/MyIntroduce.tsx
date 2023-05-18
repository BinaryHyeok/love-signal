import style from "./styles/MyIntroduce.module.scss";

type PropsType = {
  description: string;
};

const MyIntroduce: React.FC<PropsType> = ({ description }) => {
  return (
    <>
      <div className={style.introduceText}>{description}</div>
    </>
  );
};

export default MyIntroduce;
