import style from "./ManualText.module.scss";

const ManualText5 = () => {
  return (
    <div className={style.description}>
      <span className="text-red">러브하우스</span>에 머무를 수 있는 기간은{" "}
      <span className="text-red">3일</span>입니다.
      <br />
      <span className={style.TextBold}>3일차 선택의 시간에 매칭된 커플</span>
      에게는 <br />
      <span className="text-red">1:1 대화</span>할 수 있는{" "}
      <span className="text-red">영구 채팅방</span>이 열립니다.
    </div>
  );
};

export default ManualText5;
