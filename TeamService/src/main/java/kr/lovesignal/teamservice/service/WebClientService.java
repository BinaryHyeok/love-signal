package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import reactor.core.publisher.Mono;

import java.util.List;

public interface WebClientService {

    public void makeChatRoomApi(List<String> memberUUIDs);

    public Mono<TeamResponse> getProfileImagesByTeamsApi(TeamResponse teamResponse);

    public Mono<Team> getProfileImagesByTeamApi(Team team);
}
