import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.ChangeEvent<HTMLElement>) => void;
};

const A_FemaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <div className={style.container}>
      <label
        className={`${style.selectGender} ${style.female}`}
        htmlFor="female"
      >
        <input
          type="radio"
          name="gender"
          value="F"
          id="female"
          className={style.radio}
          checked={gender === "F"}
          onChange={changeGender}
        />
        <img src="/assets/female.png" id="F" className={style.genderImg} />
      </label>
    </div>
  );
};

export default A_FemaleLabel;
