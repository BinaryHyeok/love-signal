import { Dispatch, SetStateAction } from "react";
import style from "./styles/Input_Type_C.module.scss";

type propsType = {
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
};

const Input_Type_C: React.FC<propsType> = ({ gender, setGender }) => {
  const changeGender = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
  };
  return (
    <>
      <label className={style.base_value}>
        <input
          type="radio"
          name="M"
          value="M"
          checked={gender === "M"}
          onClick={changeGender}
        />{" "}
        위스키
      </label>
      <label className={style.base_value}>
        <input
          type="radio"
          name="W"
          value="W"
          checked={gender === "W"}
          onClick={changeGender}
        />{" "}
        럼
      </label>
    </>
  );
};

export default Input_Type_C;
