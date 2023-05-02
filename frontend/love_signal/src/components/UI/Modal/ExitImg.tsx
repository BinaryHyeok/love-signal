import style from "./ExitImg.module.scss";

type propsType = {
  closeModal: () => void;
};

const ExitImg: React.FC<propsType> = ({ closeModal }) => {
  return (
    <>
      <img
        src="/assets/exit.png"
        className={style.exit}
        alt="나가기"
        onClick={closeModal}
      />
    </>
  );
};

export default ExitImg;
