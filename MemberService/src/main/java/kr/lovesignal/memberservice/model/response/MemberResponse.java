package kr.lovesignal.memberservice.model.response;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@Builder
public class MemberResponse {

    private String memberUUID;
    private String nickname;
    private String gender;
    private int age;
    private String description;
    private String teamUUID;
    private boolean teamLeader;

    public static MemberResponse toDto(MemberEntity member, int age){
        return MemberResponse.builder()
                .memberUUID(member.getUUID().toString())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .age(age)
                .description(member.getDescription())
                .teamUUID(member.getTeam() != null ? member.getTeam().getUUID().toString() : null)
                .teamLeader(member.getTeamLeader() == "T" ? true : false)
                .build();
    }
}
