import style from "./HeartLine.module.scss";

type PropsType = {
  type: string;
  count: string;
};

const HeartLine: React.FC<PropsType> = ({ type, count }) => {
  const hearts = [];
  const c = +count;
  for (let i = 0; i < c; i++) {
    hearts.push(<img src={`/assets/${type}_heart.png`} />);
  }

  return <div className={style.line}>{hearts}</div>;
};

export default HeartLine;
