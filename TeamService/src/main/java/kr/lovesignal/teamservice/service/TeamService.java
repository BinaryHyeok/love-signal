package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.Team;

import java.util.List;

public interface TeamService {

    // 동성 팀 생성
    public SuccessResponse<String> createTeam(String memberUUID);

    //동성 팀 가입
    public int JoinTeam(String teamUUID, String memberUUID);

    //동성 팀 탈퇴
    public SuccessResponse<String> leaveTeam(String memberUUID);

    // 동성 팀 및 이성 팀 조회
    public SuccessResponse<Team> getTeamByTeamUUID(String teamUUID);

    // 이성 팀 목록 조회
    public SuccessResponse<List<Team>> getOppositeGenderTeams(
            String gender,
            int size,
            GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest);

    // 미팅 신청받은 목록 조회
    public SuccessResponse<List<Team>> getReceivedMeetings(String teamUUID);

    // 미팅 신청한 목록 조회
    public SuccessResponse<List<Team>> getSentMeetings(String teamUUID);

    // 미팅 신청
    public SuccessResponse<String> createMeeting(String teamUUID, String oppositeTeamUUID);

    // 미팅 수락
    public void accpetMeeting(String teamUUID, String oppositeTeamUUID);

    // 미팅 거절
    public SuccessResponse<String> rejectMeeting(String teamUUID, String oppositeTeamUUID);

    public List<String> makeChatRoomMembers(String teamUUID);

    public List<String> makeChatRoomMembers(String teamUUID, String oppositeTeamUUID);

    public void createTeamChatApi(List<String> memberUUIDs);
}
