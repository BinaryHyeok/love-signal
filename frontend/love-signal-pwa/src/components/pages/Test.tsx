import React, { useState } from "react";
import style from "./Test.module.scss"; // 스타일 파일을 import합니다.

const Test = () => {
  const [onoff, setOnOff] = useState<boolean>(false);
  const checkInput = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLInputElement;
    console.log(target.value);
    setOnOff(!onoff);
    console.log(onoff);
  };
  return (
    <>
      <div className={style.toggleSwitch}>
        <input type="checkbox" className={style.checkbox} id="toggleSwitch" />
        <label className={style.label} htmlFor="toggleSwitch">
          <span className={style.toggleInner} />
          <span className={style.switch} />
        </label>
      </div>
    </>
  );
};

export default Test;
