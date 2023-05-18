import React, { forwardRef } from "react";

type PropsType = {
  changeImg: (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => void;
};

const EditBtnInput = forwardRef<HTMLInputElement, PropsType>(
  ({ changeImg }: PropsType, ref) => {
    return (
      <>
        <input
          type="file"
          accept="image/*"
          ref={ref}
          style={{ display: "none" }}
          onChange={changeImg}
        />
      </>
    );
  }
);

export default EditBtnInput;
