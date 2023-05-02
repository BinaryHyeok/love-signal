import { useState, useEffect } from "react";
import style from "./styles/ExploreTeam.module.scss";
import { useRecoilState } from "recoil";
import { footerIdx } from "../../../atom/footer";
import Loading from "../../UI/Loading/LoadingSpinner";
import Modal_portal from "../../UI/Modal/Modal_portal";
import CheckTeam from "../../UI/Modal/CheckTeam";
import { member, team } from "../../../types/member";
import A_OtherTeamDesc from "../../atoms/OtherGender/A_OtherTeamDesc";
import PictureBox from "../../molecules/OtherGender/M_OtherTeamPicture";
import ListBoxWithImgTitle from "../../UI/Common/ListBoxWithImgTitle";
import RedHeartLine from "../../UI/Common/RedHearLine";
import { fetchList } from "../../../api/othergender";

const ExploreTeam = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //팀 코드를 저장해줄 변수입니다.(또는 그 팀의 배열 위치?)
  const [teamNumber, setTeamNumber] = useState<number>(0);
  const [team, setTeam] = useState<team[]>([]);
  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [uuidList, setuuidList] = useState<string[]>([]);
  let [receiveList, setReceiveList] = useState<number>(10); //받아올 리스트 수.
  let [infinityScroll, setInfinityScroll] = useState<boolean>(true);

  useEffect(() => {
    setIdx(0);
    getList();
  }, []);

  //리스트를 받아올 axios 함수입니다.
  const getList = async () => {
    await fetchList("M", receiveList, uuidList)
      .then((res) => {
        setInfinityScroll(false);
        addmemberList(res.data.body);
        adduuidList(res.data.body);
        setIsLoading(true);
        setReceiveList(receiveList + 10);
        setInfinityScroll(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  //현재 동작안함..
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const isEnd =
      Math.round(target.scrollTop + target.clientHeight) >
      target.scrollHeight - 100;

    if (isEnd && !infinityScroll) {
      setInfinityScroll(true);
      getList();
    }
  };

  //뭔가 안이쁜데.. 코드가 짧아짐
  if (isLoading) {
    return (
      <>
        {visible ? (
          <Modal_portal>
            <CheckTeam
              setVisible={setVisible}
              visible={visible}
              member={team[teamNumber].members}
            />
          </Modal_portal>
        ) : (
          <div className={style.otherContainer}>
            <A_OtherTeamDesc />
            <div className={style.imgContainer} onScroll={handleScroll}>
              {team.map((item, idx) => (
                <ListBoxWithImgTitle
                  title={
                    <>
                      <RedHeartLine />
                    </>
                  }
                  type="red"
                >
                  <PictureBox
                    viewDetail={viewDetail}
                    idx={idx}
                    item={item.members}
                  />
                </ListBoxWithImgTitle>
              ))}
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        <Loading />
      </>
    );
  }
};

export default ExploreTeam;
