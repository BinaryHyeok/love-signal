package kr.lovesignal.memberservice.model.response;

import kr.lovesignal.memberservice.exception.ErrorCode;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
}
