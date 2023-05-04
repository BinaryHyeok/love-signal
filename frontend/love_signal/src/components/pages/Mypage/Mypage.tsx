import { useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);

  useEffect(() => {
    setIdx(3);
  }, [setIdx]);

  return (
    <>
      <div className={style.myPageContainer}>
        <M_Image_Type />
        <MyInfo />
      </div>
    </>
  );
};

export default Mypage;
