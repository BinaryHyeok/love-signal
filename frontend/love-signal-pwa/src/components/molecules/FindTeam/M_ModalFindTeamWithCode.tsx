import React, { Dispatch, SetStateAction } from "react";
import style from "./styles/M_ModalFindTeamWithCode.module.scss";
import Input_Type_A from "../../UI/Common/Input_Type_A";
import Button_Type_B from "../../UI/Common/Button_Type_B";
import A_TextHighlight from "../../atoms/Common/A_TextHighlight";
import A_Heartline from "../../atoms/Common/A_Heartline";

type PropsType = {
  isErr: boolean;
  enterTeam: () => void;
  setEnterTeamUUID: Dispatch<SetStateAction<string>>;
  errMsg: string;
};

const M_ModalFindTeamWithCode: React.FC<PropsType> = ({
  isErr,
  enterTeam,
  setEnterTeamUUID,
  errMsg,
}) => {
  const writeTeamCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setEnterTeamUUID(target.value);
  };
  return (
    <div className={style.modalContent}>
      <A_Heartline type="blue" count="3" />
      <span>
        <A_TextHighlight color="blue">팀 코드</A_TextHighlight>로 입장하기
      </span>
      <Input_Type_A
        type="text"
        id="팀코드"
        className="writeTeamcode"
        width="216px"
        background="#D9D9D9"
        margin="8px 0 16px 0"
        onChange={writeTeamCode}
      />
      {isErr && <A_TextHighlight color="blue">{errMsg}</A_TextHighlight>}
      <Button_Type_B
        margin="8px 0 8px 0"
        width="120px"
        height="30px"
        background="#CAD9FF"
        onClick={enterTeam}
      >
        입장하기
      </Button_Type_B>
    </div>
  );
};

export default M_ModalFindTeamWithCode;
