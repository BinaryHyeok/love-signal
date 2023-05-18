import style from "./styles/LoadingHeartContainer.module.scss";
import A_LoadingTopHeart from "./A_LoadingTopHeart";
import A_LoadingBottomHeart from "./A_LoadingBottomHeart";

const LoadingHeartContainer = () => {
  return (
    <div className={`${style.heartContainer} diagonal-gradient`}>
      <A_LoadingTopHeart />
      <A_LoadingBottomHeart />
    </div>
  );
};

export default LoadingHeartContainer;
