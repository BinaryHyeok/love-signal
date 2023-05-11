import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { footerIdx } from "../../../atom/footer";
import { footerIsOn } from "../../../atom/footer";
import { useRecoilState } from "recoil";
import style from "./Footer.module.scss";
import A_FooterIcon from "./A_FooterIcon";
import { kid, myTeamUUID, myatk } from "../../../atom/member";
import { getMyTeam } from "../../../api/team";

const Footer = () => {
  const navigate = useNavigate();

  const [idx, setIdx] = useRecoilState<number>(footerIdx);
  const [isOn, setFooterIsOn] = useRecoilState<boolean>(footerIsOn);
  const [myTUUID, setMyTeamUUID] = useRecoilState<string>(myTeamUUID);
  const [atk] = useRecoilState<string>(myatk);
  const [kID] = useRecoilState<string>(kid);

  const [color, setColor] = useState<string[]>([
    "black",
    "black",
    "black",
    "black",
  ]);

  let [, setClickNav] = useState<boolean[]>([false, false, false, false]);

  useEffect(() => {
    setClickNav(falseArr.map((_, index) => index === idx));
    setColor(color.map((_, index) => (index === idx ? "color" : "black")));

    if (idx !== 2) {
      setFooterIsOn(true);
    }
  }, [idx]);

  const falseArr = [false, false, false, false];
  const setNav = (id: number, path: string) => {
    setClickNav(falseArr.map((_, index) => index === id));
    setColor(color.map((_, index) => (index === id ? "color" : "black")));
    navigate(path);
  };

  const isClickNav = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLImageElement;
    const navid: number = +target.id;
    setIdx(navid);

    if (navid === 0) {
      setNav(0, "/OtherGender");
    } else if (navid === 1) {
      getMyTeam(myTUUID, atk, kID)
        .then((res) => {
          console.log(res);
          if (
            !res.data.body.haveMeetingTeam &&
            res.data.body.members.length !== 3
          ) {
            setNav(1, "/SameGender/build");
          } else {
            setNav(1, "/SameGender/Myteam");
          }
        })
        .catch(() => {
          setNav(1, "/SameGender");
          setMyTeamUUID("");
        });
    } else if (navid === 2) {
      setNav(2, "/Chat");
    } else if (navid === 3) {
      setNav(3, "/Mypage");
    }
  };

  return (
    <div className={`${style.container} ${!isOn ? style.closed : ""}`}>
      <div className={style.content}>
        <A_FooterIcon
          idx="0"
          color={color[0]}
          address="othergender"
          isClickNav={isClickNav}
          size="1"
        />
        <A_FooterIcon
          idx="1"
          color={color[1]}
          address="group"
          isClickNav={isClickNav}
          size="1"
        />
        <A_FooterIcon
          idx="2"
          color={color[2]}
          address="chat"
          isClickNav={isClickNav}
          size="2"
        />
        <A_FooterIcon
          idx="3"
          color={color[3]}
          address="mypage"
          isClickNav={isClickNav}
          size="2"
        />
      </div>
    </div>
  );
};

export default Footer;
