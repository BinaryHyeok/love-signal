package kr.lovesignal.teamservice.model.response;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Team {

    private String teamUUID;
    private boolean haveMeetingTeam;
    private List<Member> members;

    public static Team buildTeamResponse(TeamEntity teamEntity, List<MemberEntity> memberEntities){
        return Team.builder()
                .teamUUID(teamEntity.getUUID().toString())
                .haveMeetingTeam(teamEntity.getMeeting().equals("T") ? true : false)
                .members(Member.buildMembers(memberEntities))
                .build();
    }
}
