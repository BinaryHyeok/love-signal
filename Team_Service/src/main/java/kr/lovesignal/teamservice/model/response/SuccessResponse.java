<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/model/response/SuccessResponse.java
package kr.lovesignal.memberservice.model.response;
========
package kr.lovesignal.teamservice.model.response;
>>>>>>>> be_develop_team:Team_Service/src/main/java/kr/lovesignal/teamservice/model/response/SuccessResponse.java

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SuccessResponse<T> {

    private LocalDateTime timestamp;
    private T body;
}
