import style from "./styles/Main.module.scss";
import MainBtn from "../../molecules/Main/M_MainBtn";
import A_MainImg from "../../atoms/Main/A_MainImg";

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
