import { useRecoilState } from "recoil";
import { myatkET } from "../atom/member";
import cookie from "react-cookies";
import { expireATK } from "../api/auth";

const [atkET] = useRecoilState<Date>(myatkET);

//만료시간을 ATK가 만료되었는지 확인해주는 함수입니다.
export const expireCompare = () => {
  const date = new Date();
  const rtk = cookie.load("rtk");
  if (date < atkET) {
    //내 atk의 만료시간이 끝났기 때문에 refreshToken을 보내줘.
    expireATK(rtk)
      .then((res) => {})
      .catch((err) => {});
  }
  //이건 한번 해봐야할거같다.
};
