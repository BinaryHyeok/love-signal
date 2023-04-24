package kr.lovesignal.memberservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SignInRequest {

    private String login_id;
    private String password;
}
