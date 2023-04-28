package kr.lovesignal.teamservice.model.response;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TeamResponse {

    private String teamUUID;
    private List<Member> members;

    public static TeamResponse buildTeamResponse(TeamEntity teamEntity, List<MemberEntity> memberEntities){
        return TeamResponse.builder()
                .teamUUID(teamEntity.getUUID().toString())
                .members(Member.buildMembers(memberEntities))
                .build();
    }
}
