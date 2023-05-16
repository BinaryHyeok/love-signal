import style from "./ManualText.module.scss";

const ManualText3 = () => {
  return (
    <div className={style.description}>
      <span className="text-red">초대</span>를
      <span className="text-red">수락</span>하면,
      <br />
      <span className="text-red">러브하우스</span>에
      <span className={style.TextBold}> 입주</span>하게 됩니다.
    </div>
  );
};

export default ManualText3;
