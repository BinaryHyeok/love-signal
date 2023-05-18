<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/model/response/ErrorResponse.java
package kr.lovesignal.memberservice.model.response;
========
package kr.lovesignal.teamservice.model.response;
>>>>>>>> be_develop_team:Team_Service/src/main/java/kr/lovesignal/teamservice/model/response/ErrorResponse.java

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
