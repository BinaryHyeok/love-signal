package kr.lovesignal.authservice.model.request;

import kr.lovesignal.authservice.entity.MemberEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {

    private String nickname;
    private String gender;
    private String birth;
    private String description;
}
