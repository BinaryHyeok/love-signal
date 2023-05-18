package kr.lovesignal.fileservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Client Error 4xx
    // 400 BAD_REQUEST : 잘못된 요청
    INVALID_UUID(HttpStatus.BAD_REQUEST, "UUID가 올바르지 않습니다."),

    // 404 NOT_FOUND : 리소스를 찾을 수 없음
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저 정보를 찾을 수 없습니다"),
    FILE_IS_NULL(HttpStatus.BAD_REQUEST, "이미지 파일이 없습니다."),

    // 409 CONFLICT : 요청수행 중 충돌이 발생
    INVALID_IMAGE_EXTENSION(HttpStatus.CONFLICT, "이미지 파일 확장자가 올바르지 않습니다."),
    CAN_NOT_PROCESSING_PROFILE_IMAGE(HttpStatus.CONFLICT, "이미지 파일 프로세싱을 할 수 없습니다"),



    // Server Error 5xx
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 오류가 발생하여 요청을 수행할 수 없습니다");

    private final HttpStatus httpStatus;
    private final String message;
}
