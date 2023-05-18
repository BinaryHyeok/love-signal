import style from "./styles/ExitImg.module.scss";

type propsType = {
  closeModal: () => void;
};

const ExitImg: React.FC<propsType> = ({ closeModal }) => {
  return (
    <>
      <img
        src={`${process.env.REACT_APP_ASSETS_DIR}/exit.png`}
        className={style.exit}
        alt="나가기"
        onClick={closeModal}
      />
    </>
  );
};

export default ExitImg;
