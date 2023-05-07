import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.MouseEvent<HTMLElement>) => void;
};

const A_FemaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <div className={style.container}>
      <label className={`${style.selectGender} ${style.female}`}>
        <input
          type="radio"
          name="F"
          value="F"
          checked={gender === "F"}
          onClick={changeGender}
          className={style.radio}
        />
        <img src="/assets/female.png" id="F" className={style.genderImg} />
      </label>
    </div>
  );
};

export default A_FemaleLabel;
