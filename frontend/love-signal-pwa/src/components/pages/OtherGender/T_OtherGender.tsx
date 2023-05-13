import { Dispatch, SetStateAction } from "react";
import style from "./styles/ExploreTeam.module.scss";
import { team } from "../../../types/member";
import A_OtherTeamDesc from "../../atoms/OtherGender/A_OtherTeamDesc";
import PictureBox from "../../molecules/OtherGender/M_OtherTeamPicture";
import ListBoxWithImgTitle from "../../atoms/Common/ListBoxWithImgTitle";
import A_Heartline from "../../atoms/Common/A_Heartline";
import { motion } from "framer-motion";
import { contentVariants } from "../../atoms/Common/contentVariants";

type propsType = {
  getList: () => void;
  infinityScroll: boolean;
  lastList: boolean;
  setInfinityScroll: Dispatch<SetStateAction<boolean>>;
  viewDetail: (idx: number) => void;
  team: team[];
};

const T_OtherGender: React.FC<propsType> = ({
  getList,
  infinityScroll,
  lastList,
  setInfinityScroll,
  viewDetail,
  team,
}) => {
  //무한스크롤이 구현되어있는 함수입니다.
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    const isEnd =
      Math.round(target.scrollTop + target.clientHeight) >
      target.scrollHeight - 100;

    if (isEnd && !infinityScroll && lastList) {
      setInfinityScroll(true);
      getList();
    }
  };

  return (
    <div className={style.otherContainer}>
      <A_OtherTeamDesc />
      <div className={style.imgContainer} onScroll={handleScroll}>
        {team.map((item, idx) => (
          <ListBoxWithImgTitle
            key={idx}
            title={
              <>
                <A_Heartline type="red" count="3" />
              </>
            }
            type="red"
          >
            <PictureBox viewDetail={viewDetail} idx={idx} team={item} />
          </ListBoxWithImgTitle>
        ))}
      </div>
    </div>
  );
};

export default T_OtherGender;
