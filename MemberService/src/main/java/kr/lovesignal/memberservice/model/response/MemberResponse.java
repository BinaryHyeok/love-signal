package kr.lovesignal.memberservice.model.response;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberResponse {

    private String memberUUID;
    private String nickname;
    private String gender;
    private int age;
    private String description;
    private String teamUUID;
    private boolean teamLeader;
    private String profileImage;
    private boolean receiveAlarm;
    private boolean matchingStatus;

    public static MemberResponse toDto(MemberEntity member, int age){
        return MemberResponse.builder()
                .memberUUID(member.getUUID().toString())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .age(age)
                .receiveAlarm("T".equals(member.getReceiveAlarm()) ? true : false)
                .matchingStatus("T".equals(member.getMatchingStatus()) ? true : false)
                .description(member.getDescription())
                .teamUUID(member.getTeam() != null ? member.getTeam().getUUID().toString() : null)
                .teamLeader("T".equals(member.getTeamLeader()) ? true : false)
                .build();
    }
}
