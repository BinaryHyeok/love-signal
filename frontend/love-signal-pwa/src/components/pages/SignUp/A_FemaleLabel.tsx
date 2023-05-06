import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.MouseEvent<HTMLElement>) => void;
};

const A_FemaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <label className={style.selectGender}>
      <img src="/assets/female.png" id="F" className={style.genderImg} />
      <input
        type="radio"
        name="F"
        value="F"
        checked={gender === "F"}
        onClick={changeGender}
      />{" "}
      여자
    </label>
  );
};

export default A_FemaleLabel;
