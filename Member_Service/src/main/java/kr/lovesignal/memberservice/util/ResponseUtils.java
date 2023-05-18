<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/util/ResponseUtils.java
<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/util/ResponseUtils.java
package kr.lovesignal.memberservice.util;

import kr.lovesignal.memberservice.exception.ErrorCode;
import kr.lovesignal.memberservice.model.response.ErrorResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
========
package kr.lovesignal.teamservice.util;

import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.model.response.ErrorResponse;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
>>>>>>>> be_develop_team:Team_Service/src/main/java/kr/lovesignal/teamservice/util/ResponseUtils.java
========
package kr.lovesignal.fileservice.util;

import kr.lovesignal.fileservice.exception.ErrorCode;
import kr.lovesignal.fileservice.model.response.ErrorResponse;
import kr.lovesignal.fileservice.model.response.SuccessResponse;
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/util/ResponseUtils.java
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ResponseUtils<T> {

    public SuccessResponse<T> buildSuccessResponse(T body) {
        return SuccessResponse.<T>builder()
                .timestamp(LocalDateTime.now())
                .body(body)
                .build();
    }

    public ErrorResponse buildErrorResponse(ErrorCode error, String path){
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(error.getHttpStatus().value())
                .error(error.name())
                .message(error.getMessage())
                .path(path)
                .build();
    }
}
