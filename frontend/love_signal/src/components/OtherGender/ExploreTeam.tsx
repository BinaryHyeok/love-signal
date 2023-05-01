import { useState, useEffect } from "react";
import style from "./ExploreTeam.module.scss";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../atom/footer";
import Codepen from "../UI/Loading/codepen";
import Modal_portal from "../UI/Modal/Modal_portal";
import CheckTeam from "../UI/Modal/CheckTeam";
import { member, team } from "../../types/member";
import OtherTeamDesc from "./OtherTeamDesc";
import PictureBox from "./OtherTeamPicture";
import ListBoxWithImgTitle from "../UI/Common/ListBoxWithImgTitle";
import RedHeartLine from "../UI/Common/RedHearLine";
import Footer from "../UI/Footer/Footer";
import { fetchList } from "../../api/othergender";

const ExploreTeam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const [team, setTeam] = useState<team[]>([]);
  const [member, setMember] = useState<member[]>([]);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [uuidList, setuuidList] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 100);
    setIdx(0);

    fetchList("M", 10, uuidList)
      .then((res) => {
        console.log(res.data.body);
        addmemberList(res.data.body);
        adduuidList(res.data.body);
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(uuidList);
  }, [uuidList]);

  const adduuidList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setuuidList((uuidList) => [...uuidList, item.teamUUID]);
    });
  };

  const addmemberList = (teamList: team[]) => {
    teamList.forEach((item) => {
      setTeam((team) => [...team, item]);
    });
  };

  //상세보기 모달창을 띄워주는 함수입니다.
  const viewDetail = (idx: number) => {
    //여기서 내가 팀이 있는지 없는지 체크를 해서 팀이 있으면 상세보기로 없으면 팀을 구성하라는 모달을 띄워주어야합니다.
    setTeamNumber(idx);
    setVisible(!visible);
  };

  const dummy: member[][] = [
    [
      {
        nickname: "John",
        age: 26,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Tom",
        age: 24,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Alice",
        age: 25,
        description: "친구찾으러왔어요~",
      },
    ],
    [
      {
        nickname: "John",
        age: 26,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Tom",
        age: 24,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Alice",
        age: 25,
        description: "친구찾으러왔어요~",
      },
    ],
    [
      {
        nickname: "John",
        age: 26,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Tom",
        age: 24,
        description: "친구찾으러왔어요~",
      },
      {
        nickname: "Alice",
        age: 25,
        description: "친구찾으러왔어요~",
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
            <Footer />
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
