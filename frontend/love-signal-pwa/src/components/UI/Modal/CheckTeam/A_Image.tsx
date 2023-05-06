import style from "./A_Image.module.scss";

type propsType = {
  profileImage: string;
};

const A_Image: React.FC<propsType> = ({ profileImage }) => {
  return (
    <div className={style.image}>
      <img src={profileImage} alt="" />
    </div>
  );
};

export default A_Image;
