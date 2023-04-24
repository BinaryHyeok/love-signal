package kr.lovesignal.memberservice.model.request;

import lombok.*;

@Getter
@Setter
@Builder
public class SignUpRequest {

    private String login_id;
    private String password;


}
