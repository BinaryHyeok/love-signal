import style from "./styles/A_Exit.module.scss";

type propsType = {
  closeModal: () => void;
};

const A_Exit: React.FC<propsType> = ({ closeModal }) => {
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

export default A_Exit;
