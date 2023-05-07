import React, { useState, useRef } from "react";
import axios from "axios";
import EditBtnImg from "../UI/Common/EditBtnImg";
import EditBtnInput from "../UI/Common/EditBtnInput";
import { changeMyImg } from "../../api/file";
const FILE_SIZE_MAX_LIMIT = 5 * 1024 * 1024; // 5MB
const ALLOW_FILE_EXTENSION = "jpg,jpeg,png";

const Test = () => {
  const publicUrl = process.env.PUBLIC_URL;
  const filesample = `${publicUrl}/assets/girl5.png`;
  //여기서 fileImg 시작이 filesample이 아닌 myImg가 들어갈것.
  const [fileImg, setFileImg] = useState<string>(filesample);
  const [file, setFile] = useState<File>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onChangeImg = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>
  ) => {
    const target = e.currentTarget;
    const files = (target.files as FileList)[0];

    if (files === undefined) {
      return;
    }

    const fileExtensionValid = ({ name }: { name: string }): boolean => {
      // 파일 확장자
      const extension = removeFileName(name);
      /**
       * 허용가능한 확장자가 있는지 확인하는 부분은 indexOf를 사용해도 괜찮고,
       * 새롭게 나온 includes를 사용해도 괜찮고, 그밖의 다른 방법을 사용해도 좋다.
       * 성능과 취향의 따라 사용하면 될것같다.
       *
       * indexOf의 경우
       * 허용가능한 확장자가 있을경우
       * ALLOW_FILE_EXTENSION 상수의 해당 확장자 첫 index 위치값을 반환
       */
      if (!(ALLOW_FILE_EXTENSION.indexOf(extension) > -1) || extension === "") {
        // 해당 if문이 수행되는 조건은
        // 1. 허용하지 않은 확장자일경우
        // 2. 확장자가 없는경우이다.
        return false;
      }
      return true;
    };

    const removeFileName = (originalFileName: string): string => {
      // 마지막 .의 위치를 구한다
      // 마지막 .의 위치다음이 파일 확장자를 의미한다
      const lastIndex = originalFileName.lastIndexOf(".");

      // 파일 이름에서 .이 존재하지 않는 경우이다.
      // 이경우 파일 확장자가 존재하지 않는경우(?)를 의미한다.
      if (lastIndex < 0) {
        return "";
      }

      // substring을 함수를 이용해 확장자만 잘라준다
      // lastIndex의 값은 마지막 .의 위치이기 때문에 해당 위치 다음부터 끝까지 문자열을 잘라준다.
      // 문자열을 자른 후 소문자로 변경시켜 확장자 값을 반환 해준다.
      return originalFileName.substring(lastIndex + 1).toLowerCase();
    };

    if (!fileExtensionValid(files)) {
      target.value = "";
      alert(
        `업로드 가능한 확장자가 아닙니다. [가능한 확장자 : ${ALLOW_FILE_EXTENSION}]`
      );
      return;
    }

    if (files.size > FILE_SIZE_MAX_LIMIT) {
      alert("용량 초과");
      return;
    }
    console.log(files);

    setFile(files);
    setFileImg(URL.createObjectURL(files));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  //   axios 요청 함수.
  const onSubmitImg = async () => {
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(formData.get("file"));

      console.log("나의 이미지는 저거얏");
      changeMyImg("f6fc66c4-34cb-4f0d-ab89-34a974917654", formData);
    }
  };
  return (
    <>
      <EditBtnImg imgClick={handleImageClick} />
      <EditBtnInput ref={fileInputRef} changeImg={onChangeImg} />
      <button onClick={onSubmitImg}>사진변경</button>
    </>
  );
};

export default Test;
