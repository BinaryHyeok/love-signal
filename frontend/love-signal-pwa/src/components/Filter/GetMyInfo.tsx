import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  imLeader,
  kid,
  myGender,
  myMemberUUID,
  myTeamUUID,
  myatk,
  nickname,
} from "../../atom/member";
import { inquireMember } from "../../api/auth";

type propsType = {
  children: any;
};

const GetMyInfo: React.FC<propsType> = ({ children }) => {
  const [memberUUID, setMyMemberUUID] = useRecoilState<string>(myMemberUUID);
  const [, setMyTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [, setTeamLeader] = useRecoilState<boolean>(imLeader);
  const [, setNickname] = useRecoilState<string>(nickname);
  const [, setGender] = useRecoilState<string>(myGender);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  useEffect(() => {
    inquireMember(memberUUID, atk, kID)
      .then((res) => {
        console.log(res);
        setMyMemberUUID(res.data.body.memberUUID);
        setMyTeamUUID(res.data.body.teamUUID);
        setTeamLeader(res.data.body.teamLeader);
        setNickname(res.data.body.nickname);
        setGender(res.data.body.gender);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>{children}</>;
};

export default GetMyInfo;
