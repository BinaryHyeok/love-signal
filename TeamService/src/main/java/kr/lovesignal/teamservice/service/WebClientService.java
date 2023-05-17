package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

public interface WebClientService {

    public void makeChatRoomApi(List<String> memberUUIDs);

    public void makeMeetingFcmAlarm(List<String> memberUUIDs);

    public Mono<TeamResponse> getProfileImagesByTeamsApi(TeamResponse teamResponse);

    public Mono<Team> getProfileImagesByTeamApi(Team team);

    public void exitChatRoomApi(List<String> memberUUIDs);

    public void sendMeetingMemberUUIDs(List<UUID> memberUUIDs);

    public void sendMatchingTeamMemberUUIDs(List<UUID> memberUUIDs);

    public void sendTeamRemoveFcmAlarm(List<String> memberUUIDs);

    public void sendMeetingRemoveFcmAlarm(List<String> memberUUIDs);

    public void sendGetMeetingFcmAlarm(List<String> memberUUIDs);
}
