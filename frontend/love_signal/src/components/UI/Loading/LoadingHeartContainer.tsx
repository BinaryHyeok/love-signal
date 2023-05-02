import style from "./LoadingHeartContainer.module.scss";
import LoadingTopHeart from "./LoadingTopHeart";
import LoadingBottomHeart from "./LoadingBottomHeart";

const LoadingHeartContainer = () => {
  return (
    <div className={`${style.heartContainer} diagonal-gradient`}>
      <LoadingTopHeart />
      <LoadingBottomHeart />
    </div>
  );
};

export default LoadingHeartContainer;
