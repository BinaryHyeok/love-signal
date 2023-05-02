import { useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import Footer from "../../UI/Footer/Footer";
// import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import Header from "../../UI/Header/Header";
import M_Image_Type from "../../UI/Common/M_Image_Type";
import MyInfo from "./MyInfo";

const Mypage = () => {
  const [, setIdx] = useRecoilState<number>(footerIdx);

  useEffect(() => {
    setIdx(3);
  }, [setIdx]);

  return (
    <>
      <Header />
      <M_Image_Type />
      <MyInfo />
      <Footer />
    </>
  );
};

export default Mypage;
