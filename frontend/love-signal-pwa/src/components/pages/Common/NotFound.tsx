import style from "./styles/NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={`${style.notfound} diagonal-gradient`}>
      <span>404, Not Found</span>
    </div>
  );
};

export default NotFound;
