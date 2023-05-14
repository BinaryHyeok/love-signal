import style from "./ManualTitle.module.scss";
const ManualTitle = () => {
  return (
    <>
      <img
        src={`${process.env.REACT_APP_ASSETS_DIR}/manuallogo.png`}
        className={style.logo}
      />
    </>
  );
};

export default ManualTitle;
