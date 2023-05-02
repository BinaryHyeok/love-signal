import { useEffect } from "react";
import { footerIdx } from "../../../atom/footer";
import Footer from "../../UI/Footer/Footer";
import style from "./styles/Mypage.module.scss";
import { useRecoilState } from "recoil";
import Header from "../../UI/Header/Header";
import Image_Type_A from "../../UI/Common/Image_Type_A";

const Mypage = () => {
  const [idx, setIdx] = useRecoilState<number>(footerIdx);

  useEffect(() => {
    setIdx(3);
  }, []);

  return (
    <>
      <Header />
      <Image_Type_A />

      <Footer />
    </>
  );
};

export default Mypage;
