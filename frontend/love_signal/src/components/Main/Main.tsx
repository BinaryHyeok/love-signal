import style from "./Main.module.scss";
import MainBtn from "./MainBtn";
import A_MainImg from "./A_MainImg";

const Main = () => {
  return (
    <>
      <div className={`${style.MainContainer} diagonal-gradient`}>
        <A_MainImg />
        <MainBtn />
      </div>
    </>
  );
};

export default Main;
