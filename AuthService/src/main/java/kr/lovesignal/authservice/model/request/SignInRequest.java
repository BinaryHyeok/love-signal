package kr.lovesignal.authservice.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInRequest {

    private String loginId;
    private String password;
}
