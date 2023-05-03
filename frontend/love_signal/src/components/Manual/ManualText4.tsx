import style from "./ManualText.module.scss";

const ManualText4 = () => {
  return (
    <div className={style.description}>
      <span className="text-red">매일 저녁 10시</span>에는
      <span className="text-red">선택의 시간</span>이 진행됩니다. <br />
      <span className={style.TextBold}>마음에 드는 이성</span>을 선택하면,
      <br />
      <span className="text-red">1시간</span>동안
      <span className="text-red">익명</span>으로
      <span className="text-red">1:1 대화</span>를 진행 할 수 있습니다.
    </div>
  );
};

export default ManualText4;
