<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/exception/CustomException.java
package kr.lovesignal.memberservice.exception;
========
package kr.lovesignal.teamservice.exception;
>>>>>>>> be_develop_team:Team_Service/src/main/java/kr/lovesignal/teamservice/exception/CustomException.java

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomException extends RuntimeException{

    private final ErrorCode errorcode;

}
