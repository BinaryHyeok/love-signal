package kr.lovesignal.memberservice.model.request;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateMemberRequest {

    private String memberUUID;
    private String nickname;
    private String description;
//    private boolean receiveAlarm;

    public MemberEntity toEntity(MemberEntity member){
        return MemberEntity.builder()
                .memberId(member.getMemberId())
                .nickname(nickname)
                .matchingStatus(member.getMatchingStatus())
                .receiveAlarm(member.getReceiveAlarm())
                .email(member.getEmail())
                .kakaoId(member.getKakaoId())
                .gender(member.getGender())
                .birth(member.getBirth())
                .description(description)
                .teamLeader(member.getTeamLeader())
                .profileImages(member.getProfileImages())
                .participants(member.getParticipants())
                .UUID(member.getUUID())
                .team(member.getTeam())
                .createdDate(member.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(member.getExpired())
                .build();
    }

}
