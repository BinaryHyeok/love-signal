import React, { useEffect, useState } from "react";
import Text_Type_A from "../../UI/Common/Text_Type_A";
import style from "./styles/EditIntroduce.module.scss";
import Mypage_Check_Btn from "../../UI/Common/MyPage_Check_Btn";

type propsType = {
  description: string;
  setDesc: (param: string) => void;
};

const EditIntroduce: React.FC<propsType> = ({ description, setDesc }) => {
  const [currDesc, setCurrDesc] = useState<string>("");

  useEffect(() => {
    setCurrDesc(description);
  }, []);

  const changeMyIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
  };

  const updateDescHandler = () => {};

  return (
    <div className={style.container}>
      <div className={style.input}>
        <Text_Type_A
          type="textarea"
          id="자기소개"
          value={currDesc}
          className="editIntroduce"
          onChange={changeMyIntroduce}
        />
      </div>
      <div className={style.button}>
        <Mypage_Check_Btn imgClick={updateDescHandler} />
      </div>
    </div>
  );
};

export default EditIntroduce;
