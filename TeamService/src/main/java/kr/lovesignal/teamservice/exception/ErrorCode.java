package kr.lovesignal.teamservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Client Error 4xx
    // 400 BAD_REQUEST : 잘못된 요청
    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다"),

    // 401 UNAUTHORIZED : 인증되지 않은 사용자
    INVALID_AUTH_TOKEN(HttpStatus.UNAUTHORIZED, "권한 정보가 없는 토큰입니다"),
    INVALID_AUTH_USER(HttpStatus.UNAUTHORIZED, "인증되지 않은 유저 입니다"),

    // 404 NOT_FOUND : 리소스를 찾을 수 없음
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "유저 정보를 찾을 수 없습니다"),

    // 409 CONFLICT : 요청수행 중 충돌이 발생
    DUPLICATE_ID(HttpStatus.CONFLICT, "이미 가입된 아이디입니다"),
    DUPLICATE_NICKNAME(HttpStatus.CONFLICT, "이미 사용중인 닉네임입니다"),

    // Server Error 5xx
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 오류가 발생하여 요청을 수행할 수 없습니다");

    private final HttpStatus httpStatus;
    private final String message;
}
