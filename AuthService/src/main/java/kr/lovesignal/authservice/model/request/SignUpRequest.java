package kr.lovesignal.authservice.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {

    private String nickname;
    private String gender;
    private String birth;
    private String description;
    private String kakaoId;
    private String email;
}
