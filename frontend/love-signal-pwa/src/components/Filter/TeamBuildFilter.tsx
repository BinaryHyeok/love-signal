import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { kid, myTeamUUID, myatk } from "../../atom/member";
import { getMyTeam } from "../../api/team";

//FindTeam, MyTeam, TeamBuild페이지에 들어가야 합니다.
const TeamBuildFilter = () => {
  useEffect(() => {
    TeamFilter();
  }, []);

  const navigate = useNavigate();

  const [teamUUID, setTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  //내가 시작했을때.. navigate를 해주려면 내 정보가 필요하다.
  //팀이 있는지 없는지 파악.
  const TeamFilter = () => {
    if (teamUUID !== null || teamUUID !== "") {
      getMyTeam(teamUUID, atk, kID).then((res) => {
        //내가 상대팀을 가지고 있는지를 파악.
        if (
          !res.data.body.haveMeetingTeam &&
          res.data.body.members.length !== 3
        ) {
          navigate("/Samegender/build");
        } else {
          navigate("/Samegender/myTeam");
        }
      });
    } else {
      setTeamUUID("");
    }
  };

  return <div></div>;
};

export default TeamBuildFilter;
