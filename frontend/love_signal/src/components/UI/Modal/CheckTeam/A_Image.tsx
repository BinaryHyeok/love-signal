import style from "./A_Image.module.scss";

type propsType = {
  imgurl: string;
};

const A_Image: React.FC<propsType> = ({ imgurl }) => {
  return (
    <div className={style.image}>
      <img src={imgurl} alt="" />
    </div>
  );
};

export default A_Image;
