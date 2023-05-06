import style from "./ManualText.module.scss";

const ManualText1 = () => {
  return (
    <>
      <div className={style.description}>
        여러분은 오늘부터 <span className="text-red">러브하우스</span>
        에 입주합니다.
        <br />
        <div className={style.TextBold}>단, 입주 전 해야할 일이 있습니다.</div>
        <br />
        <div>
          함께 입주할
          <span className="text-blue">동성팀</span>을 찾아야 합니다.
        </div>
      </div>
    </>
  );
};

export default ManualText1;
