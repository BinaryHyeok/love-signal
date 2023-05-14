import style from "./ManualText.module.scss";

const ManualText6 = () => {
  return (
    <div className={style.description}>
      <span className="text-red">3일</span>이라는 기간 동안 <br />
      <span className="text-red">사랑</span>이 싹틀 수 있을까요 ?
      <br />
      <br />
      여러분의 <span className="text-red">사랑</span>을,{" "}
      <span className="text-blue">우정</span>을 <br />
      <span className="text-red">러브시그널</span>에서 찾아보세요.
      <br />
      <br />
      <span className="text-red">러브하우스</span>는 언제나 <br />
      <div className={style.TextBold}>여러분을 기다리고 있습니다.</div>
      <br />
      <img
        src={`${process.env.REACT_APP_ASSETS_DIR}/logo.png`}
        className={style.logo}
      />{" "}
      <br />
      <span className={style.TextBold}>지금 </span>
      <span className="text-red">시작</span>
      <span className={style.TextBold}>합니다.</span>
    </div>
  );
};

export default ManualText6;
