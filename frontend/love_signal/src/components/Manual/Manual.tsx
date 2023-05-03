import style from "./Manual.module.scss";
import ManualImg from "./ManualImg";
import ManualText1 from "./ManualText1";
import ManualText2 from "./ManualText2";
import ManualText3 from "./ManualText3";
import ManualText4 from "./ManualText4";
import ManualText5 from "./ManualText5";
import ManualText6 from "./ManualText6";
import ManualTitle from "./ManualTitle";

const Manual = () => {
  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.cellphoneModal}>
          <div className={style.modalContainer}>
            <ManualTitle />
            <ManualText6 />
            {/* <ManualImg num="5" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Manual;
