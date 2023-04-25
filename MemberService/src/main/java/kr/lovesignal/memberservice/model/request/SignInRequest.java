package kr.lovesignal.memberservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {

    private String loginId;
    private String password;
}
