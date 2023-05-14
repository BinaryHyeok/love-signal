import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.ChangeEvent<HTMLElement>) => void;
};

const A_MaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <div className={style.container}>
      <label className={style.selectGender} htmlFor="male">
        <input
          type="radio"
          name="gender"
          id="male"
          value="M"
          className={style.radio}
          checked={gender === "M"}
          onChange={changeGender}
        />
        <img
          src={`${process.env.REACT_APP_ASSETS_DIR}/male.png`}
          id="M"
          className={style.genderImg}
        />
      </label>
    </div>
  );
};

export default A_MaleLabel;
