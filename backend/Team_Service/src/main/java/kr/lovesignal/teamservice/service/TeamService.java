package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;

import java.util.List;

public interface TeamService {

    // 동성 팀 생성
    SuccessResponse<String> createTeam(String memberUUID);

    //동성 팀 가입
    void JoinTeam(String teamUUID, String memberUUID);

    //동성 팀 탈퇴
    void leaveTeam(String memberUUID);

    // 동성 팀 및 이성 팀 조회
    Team getTeamByTeamUUID(String teamUUID);

    // 이성 팀 목록 조회
    TeamResponse getOppositeGenderTeams(
            String gender,
            int size,
            GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest);

    // 미팅 신청받은 목록 조회
    TeamResponse getReceivedMeetings(String teamUUID);

    // 미팅 신청한 목록 조회
    TeamResponse getSentMeetings(String teamUUID);

    // 미팅 신청
    SuccessResponse<String> createMeeting(String teamUUID, String oppositeTeamUUID);

    // 미팅 수락
    void acceptMeeting(String teamUUID, String oppositeTeamUUID);

    // 미팅 거절
    SuccessResponse<String> rejectMeeting(String teamUUID, String oppositeTeamUUID);

    // 미팅중인 팀 호출
    Team getMeetingTeam(String strTeamUUID);

    // 멤버조회
    MemberEntity findMemberByMemberUUID(String strMemberUUID);

    // 미팅 만료
    void expireMeeting(List<String> memberUUIDs);

}
