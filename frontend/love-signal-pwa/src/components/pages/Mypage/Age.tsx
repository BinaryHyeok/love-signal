import style from "./styles/Age.module.scss";

type PropsType = { age: number };

const Age: React.FC<PropsType> = ({ age }) => {
  return (
    <>
      <div className={style.age}>({age})</div>
    </>
  );
};

export default Age;
