import style from "./LoadingSpinner.module.scss";
import LoadingHeartContainer from "./LoadingHeartContainer";

const LoadingSpinner = () => {
  return (
    <>
      <LoadingHeartContainer />
      <div className={style.pulse}></div>
    </>
  );
};

export default LoadingSpinner;
