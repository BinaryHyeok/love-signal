import Header from "../UI/Header/Header";
import style from "./ExploreTeam.module.scss";

const ExploreTeam = () => {
  const dummy = [
    [
      {
        imgload: "/assets/girl1.png",
      },
      {
        imgload: "/assets/girl2.png",
      },
      {
        imgload: "/assets/girl3.png",
      },
    ],
    [
      {
        imgload: "/assets/girl1.png",
      },
      {
        imgload: "/assets/girl2.png",
      },
      {
        imgload: "/assets/girl3.png",
      },
    ],
    [
      {
        imgload: "/assets/girl1.png",
      },
      {
        imgload: "/assets/girl2.png",
      },
      {
        imgload: "/assets/girl3.png",
      },
    ],
  ];
  return (
    <>
      <div className={style.backColor}>
        <Header />
        <div className={style.otherContainer}>
          <div className={style.description}>
            러브하우스에 함께 입주하고 싶은 <span>이성팀</span>에게
            <br />
            <span>초대 메세지</span>를 보내세요
          </div>
          {dummy.map((item, idx) => (
            <div className={style.otherList}>
              <img src="/assets/heartIcon.png" className={style.heartIcon} />
              <div className={style.otherPicture}>
                {item.map((Image, index) => (
                  <>
                    <img
                      key={index}
                      src={Image.imgload}
                      alt="이성이미지"
                      className={style.humanPicture}
                    />
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExploreTeam;
