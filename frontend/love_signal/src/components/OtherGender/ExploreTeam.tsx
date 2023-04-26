import { useState, useEffect } from 'react';
import Header from "../UI/Header/Header";
import style from "./ExploreTeam.module.scss";
import Codepen from '../UI/Loading/codepen';
import Modal_portal from '../UI/Modal/Modal_portal';
import CheckTeam from '../UI/Modal/CheckTeam';
import { memberType } from '../../types/member';

const ExploreTeam = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 5000);
  }, [])
  
  //상세보기 모달창을 띄워주는 함수입니다.
  const viewDetail = (idx : number) => {
    setTeamNumber(idx);
    setVisible(!visible);
  }

  const dummy : memberType[] = [
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl1.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl2.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl3.png",
      },
    ],
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl4.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl5.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl6.png",
      },
    ],
    [
      {
        nickname: "John",
        age: "26",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl1.png",
      },
      {
        nickname: "Tom",
        age: "24",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl2.png",
      },
      {
        nickname: "Alice",
        age: "25",
        description: "친구찾으러왔어요~",
        MBTI : "CUTE",
        imgload: "/assets/girl3.png",
      },
    ],
  ];
  if(isLoading) {
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
          <div className={style.description}>
            러브하우스에 함께 입주하고 싶은 <span>이성팀</span>에게
            <br />
            <span>초대 메세지</span>를 보내세요
          </div>
          {dummy.map((item, idx) => (
            <div className={style.otherList}>
              <img src="/assets/heartIcon.png" className={style.heartIcon} />
              <div className={style.otherPicture} onClick={() => viewDetail(idx)}>
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
      )}
    </>
  );
  } else {
    return (
      <>
        <Codepen />
      </>
    )
  }
};

export default ExploreTeam;
