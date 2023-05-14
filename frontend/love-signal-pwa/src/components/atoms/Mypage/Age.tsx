import style from "./styles/Age.module.scss";

type PropsType = { age: number; width: string };

const Age: React.FC<PropsType> = ({ age, width }) => {
  return (
    <>
      <div className={style.age} style={{ width: `${width}` }}>
        {age}살
      </div>
    </>
  );
};

export default Age;
