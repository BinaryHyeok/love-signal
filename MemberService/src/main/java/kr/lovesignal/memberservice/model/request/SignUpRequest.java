package kr.lovesignal.memberservice.model.request;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
public class SignUpRequest {

    private String loginId;
    private String password;
    private String nickname;
    private String gender;
    private String birth;
    private String description;
    private String help;

    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .loginId(loginId)
                .password(password)
                .nickname(nickname)
                .gender(gender)
                .birth(birth)
                .description(description)
                .help(help)
                .build();
    }
}
