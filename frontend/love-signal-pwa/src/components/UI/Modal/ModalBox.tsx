import ExitImg from "./ExitImg";
import style from "./ModalBox.module.scss";

type propsType = {
  width: string;
  height: string;
  closeModal: () => void;
  children: any;
};

const ModalBox: React.FC<propsType> = ({
  width,
  height,
  closeModal,
  children,
}) => {
  return (
    <div
      className={style.modal}
      style={{
        width: `${width}`,
        height: `${height}`,
      }}
    >
      <ExitImg closeModal={closeModal} />
      <div>{children}</div>
    </div>
  );
};

export default ModalBox;
