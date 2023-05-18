import { useState, useEffect, Dispatch, SetStateAction } from "react";
import style from "./styles/O_TeamMemberList.module.scss";
import M_TeamMemberItem from "../../molecules/TeamBuild/M_TeamMemberItem";
import { member } from "../../../types/member";
import { getMyTeam } from "../../../api/team";
import { kid, myTeamUUID, myatk } from "../../../atom/member";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Ground from "../../UI/Three/Ground";

const MEMBER_LOADING_IMG = `${process.env.REACT_APP_ASSETS_DIR}/member_loading.png`;

type propsType = {
  setMemberLength: Dispatch<SetStateAction<number>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

let timer: NodeJS.Timer;

const O_TeamMemberList: React.FC<propsType> = ({
  setMemberLength,
  setIsLoading,
}) => {
  const navigate = useNavigate();

  const [teamUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [profileList, setProfileList] = useState<member[]>([]);

  useEffect(() => {
    timer = setInterval(() => {
      setIsLoading(true);
      getMyTeam(teamUUID, atk, kID)
        .then((res) => {
          console.log(res);
          setMemberLength(res.data.body.members.length);
          const newList = [...res.data.body.members];
          while (newList.length < 3) {
            newList.push({
              memberUUID: "",
              nickname: "LOADING",
              age: 0,
              description: "",
              profileImage: MEMBER_LOADING_IMG,
            });
          }
          setProfileList([...newList]);
        })
        .catch((err) => {
          if (err.response.data.error === "TEAM_NOT_FOUND") {
            navigate("/SameGender");
          }
        });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <ul className={style.userList}>
      {profileList.map((member, idx) => (
        <M_TeamMemberItem key={idx} member={member} />
      ))}
    </ul>
  );
};

export default O_TeamMemberList;
