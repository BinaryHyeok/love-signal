import React from "react";

type propsType = {
  ref: React.RefObject<HTMLInputElement>;
  changImg: (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => void;
};

const EditBtnInput: React.FC<propsType> = ({ ref, changImg }) => {
  return (
    <>
      <input
        type="file"
        ref={ref}
        style={{ display: "none" }}
        onChange={changImg}
      />
    </>
  );
};

export default EditBtnInput;
