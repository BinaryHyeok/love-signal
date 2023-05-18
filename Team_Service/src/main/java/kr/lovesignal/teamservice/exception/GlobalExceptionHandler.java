package kr.lovesignal.teamservice.exception;

import kr.lovesignal.teamservice.model.response.ErrorResponse;
import kr.lovesignal.teamservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final ResponseUtils responseUtil;

    @ExceptionHandler(value = {CustomException.class})
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException e, HttpServletRequest request){
        log.error("handleCustomException throw CustomException : {}", e.getErrorcode());
        return ResponseEntity
                .status(e.getErrorcode().getHttpStatus())
                .body(responseUtil.buildErrorResponse(e.getErrorcode(), request.getRequestURI()));
    }

    @ExceptionHandler(value = {Exception.class})
    public ResponseEntity<ErrorResponse> handleServerException(Exception e, HttpServletRequest request){
        log.error("handleServerException throw ServerError : {}", e.getMessage());
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(responseUtil.buildErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR, request.getRequestURI()));
    }
}
