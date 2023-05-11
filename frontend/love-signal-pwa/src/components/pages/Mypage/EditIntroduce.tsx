import React, { useState } from "react";
import Text_Type_A from "../../UI/Common/Text_Type_A";
import style from "./styles/EditIntroduce.module.scss";
import Mypage_Check_Btn from "../../UI/Common/MyPage_Check_Btn";

type propsType = {
  myIntroduce: string;
  handleInfoUpdate: () => void;
};

const EditIntroduce: React.FC<propsType> = ({
  myIntroduce,
  handleInfoUpdate,
}) => {
  const [tmpMyIntroduce, setTmpMyIntroduce] = useState<string>(myIntroduce);

  const changeMyIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setTmpMyIntroduce(target.value);
  };

  return (
    <div className={style.container}>
      <div className={style.input}>
        <Text_Type_A
          type="textarea"
          id="자기소개"
          value={tmpMyIntroduce}
          className="editIntroduce"
          onChange={changeMyIntroduce}
        />
      </div>
      <div className={style.button}>
        <Mypage_Check_Btn imgClick={handleInfoUpdate} />
      </div>
    </div>
  );
};

export default EditIntroduce;
