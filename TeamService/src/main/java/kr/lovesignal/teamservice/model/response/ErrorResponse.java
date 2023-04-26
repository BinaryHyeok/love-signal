package kr.lovesignal.teamservice.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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

//    @Builder
//    public  ErrorResponse (LocalDateTime timestamp, int status, String error, String message, String path){
//        this.timestamp = timestamp;
//        this.status = status;
//        this.error = error;
//        this.message = message;
//        this.path = path;
//    }
}
