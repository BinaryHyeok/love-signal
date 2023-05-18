package kr.lovesignal.fileservice.model.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TeamResponse {

    boolean hasRemainingTeam;
    private List<Team> teams;

}
