package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WebClientServiceImpl implements WebClientService{

    private final WebClient webClient;

    @Override
    public void makeChatRoomApi(List<String> memberUUIDs){
        String uri = "http://localhost:8080/chatRoom/SameOrAllGender";
        webClient.post()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    @Override
    public Mono<TeamResponse> getProfileImagesByTeamsApi(TeamResponse teamResponse){
        String uri = "http://localhost:9010/file/profiles/teams";
        return webClient.post()
                .uri(uri)
                .bodyValue(teamResponse)
                .retrieve()
                .bodyToMono(TeamResponse.class);
    }

    @Override
    public Mono<Team> getProfileImagesByTeamApi(Team team){
        String uri = "http://localhost:9010/file/profiles/team";
        return webClient.post()
                .uri(uri)
                .bodyValue(team)
                .retrieve()
                .bodyToMono(Team.class);
    }

    @Override
    public void exitChatRoomApi(List<String> memberUUIDs) {
        String uri = "http://localhost:8080/chatroom/exit";
        webClient.put()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
