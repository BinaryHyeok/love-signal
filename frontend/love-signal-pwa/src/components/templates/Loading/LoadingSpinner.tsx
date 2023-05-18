import style from "./styles/LoadingSpinner.module.scss";
import LoadingHeartContainer from "./LoadingHeartContainer";

const LoadingSpinner = () => {
  return (
    <>
      <LoadingHeartContainer />
      <div className={style.pulse}>
        <div className={style.beat1}></div>
      </div>
    </>
  );
};

export default LoadingSpinner;
