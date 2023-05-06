import style from "./styles/GenderLabel.module.scss";

type propstType = {
  gender: string;
  changeGender: (e: React.MouseEvent<HTMLElement>) => void;
};

const A_MaleLabel: React.FC<propstType> = ({ gender, changeGender }) => {
  return (
    <label className={style.selectGender}>
      <img src="/assets/male.png" id="M" className={style.genderImg} />
      <input
        type="radio"
        name="M"
        value="M"
        checked={gender === "M"}
        onClick={changeGender}
      />{" "}
      남자
    </label>
  );
};

export default A_MaleLabel;
