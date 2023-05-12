package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WebClientServiceImpl implements WebClientService{

    private final WebClient webClient;
    private final DiscoveryClient discoveryClient;

    @Value("${server.port}")
    private int port;

    @Override
    public void makeChatRoomApi(List<String> memberUUIDs){
        String uri = "http://localhost:8080/chatRoom/SameOrAllGender";

        List<ServiceInstance> instances = discoveryClient.getInstances("chatting-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/chatRoom/SameOrAllGender";
        }

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

        List<ServiceInstance> instances = discoveryClient.getInstances("file-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/file/profiles/teams";
        }

        return webClient.post()
                .uri(uri)
                .bodyValue(teamResponse)
                .retrieve()
                .bodyToMono(TeamResponse.class);
    }

    @Override
    public Mono<Team> getProfileImagesByTeamApi(Team team){
        String uri = "http://localhost:9010/file/profiles/team";

        List<ServiceInstance> instances = discoveryClient.getInstances("file-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/file/profiles/team";
        }

        return webClient.post()
                .uri(uri)
                .bodyValue(team)
                .retrieve()
                .bodyToMono(Team.class);
    }

    @Override
    public void exitChatRoomApi(List<String> memberUUIDs) {
        String uri = "http://localhost:8080/chatroom/exit";

        List<ServiceInstance> instances = discoveryClient.getInstances("chatting-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/chatroom/exit";
        }

        webClient.put()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    @Override
    public void sendMeetingMemberUUIDs(List<UUID> memberUUIDs) {
        String uri = "http://localhost:4444/fcm/notification";

        List<ServiceInstance> instances = discoveryClient.getInstances("fcm-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/fcm/notification";
        }

        webClient.post()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
