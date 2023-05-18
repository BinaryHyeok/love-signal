package kr.lovesignal.memberservice.model.request;

import kr.lovesignal.memberservice.entity.MemberEntity;
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

    public MemberEntity toEntity(){
        return MemberEntity.builder()
                .email(email)
                .kakaoId(kakaoId)
                .birth(birth)
                .nickname(nickname)
                .gender(gender)
                .description(description)
                .build();
    }
}
