import style from "./ManualText.module.scss";
const ManualText2 = () => {
  return (
    <div className={style.description}>
      동성팀을 꾸린 뒤, <br />
      러브하우스에 함께 입주하고 싶은<span className="text-red">이성팀</span>
      에게 <br />
      <span className="text-red">초대 메세지</span>를 보내세요.
    </div>
  );
};

export default ManualText2;
