package kr.lovesignal.teamservice.model.response;

import io.swagger.annotations.ApiOperation;
import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamResponse {

    boolean hasRemainingTeam;
    private List<Team> teams;

}
