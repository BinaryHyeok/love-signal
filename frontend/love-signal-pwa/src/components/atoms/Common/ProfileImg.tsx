import style from "./styles/ProfileImg.module.scss";

type propsType = {
  fileImg: string;
};

const ProfileImg: React.FC<propsType> = ({ fileImg }) => {
  return (
    <div className={style.imgBackGround2}>
      <img src={fileImg} className={style.myImg} alt="나의 프로필 이미지" />
    </div>
  );
};

export default ProfileImg;
