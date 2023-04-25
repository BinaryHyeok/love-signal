package kr.lovesignal.memberservice.model.response;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@Builder
public class MemberResponse {

    private Long memberId;
    private String nickname;
    private String gender;
    private int age;
    private String description;
    private String help;

    public static MemberResponse toDto(MemberEntity member, int age){
        return MemberResponse.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .age(age)
                .description(member.getDescription())
                .help(member.getHelp())
                .build();
    }
}
