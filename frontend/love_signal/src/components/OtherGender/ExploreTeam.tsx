import { useState, useEffect } from "react";
import Header from "../UI/Header/Header";
import style from "./ExploreTeam.module.scss";
import Codepen from "../UI/Loading/codepen";
import Modal_portal from "../UI/Modal/Modal_portal";
import CheckTeam from "../UI/Modal/CheckTeam";
import { memberType } from "../../types/member";
import OtherTeamDesc from "./OterTeamDesc";
import PictureBox from "./OhterTeamPicture";
import ListBoxWithImgTitle from "../UI/Common/ListBoxWithImgTitle";
import RedHeartLine from "../UI/Common/RedHearLine";

const ExploreTeam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);
  }, []);

  //상세보기 모달창을 띄워주는 함수입니다.
  const viewDetail = (idx: number) => {
    setTeamNumber(idx);
    setVisible(!visible);
  };

  const dummy: memberType[] = [
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl1.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl2.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl3.png",
      },
    ],
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl4.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl5.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl6.png",
      },
    ],
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl1.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl2.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI: "CUTE",
        imgload: "/assets/girl3.png",
      },
    ],
  ];
  if (isLoading) {
    return (
      <>
        {visible && (
          <Modal_portal>
            <CheckTeam
              setVisible={setVisible}
              visible={visible}
              member={dummy[teamNumber]}
            />
          </Modal_portal>
        )}
        {!visible && (
          <div className={style.backColor}>
            <Header />
            <div className={style.otherContainer}>
              <OtherTeamDesc />
              {dummy.map((item, idx) => (
                <>
                  <ListBoxWithImgTitle
                    title={
                      <>
                        <RedHeartLine />
                      </>
                    }
                    type="red"
                  >
                    <PictureBox viewDetail={viewDetail} idx={idx} item={item} />
                  </ListBoxWithImgTitle>
                </>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <Codepen />
      </>
    );
  }
};

export default ExploreTeam;
