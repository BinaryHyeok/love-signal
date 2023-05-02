import style from "./styles/A_TeamMemberImage.module.scss";

type PropsType = {
  imgSrc?: string;
};

const A_TeamMemberImage: React.FC<PropsType> = ({ imgSrc }) => {
  return (
    <div className={style.imgBox}>
      <img src={imgSrc} />
    </div>
  );
};

export default A_TeamMemberImage;
