package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.TeamResponse;

import java.util.List;

public interface TeamService {

    // 동성 팀 생성
    public SuccessResponse<String> createTeam(String memberUUID);

    //동성 팀 가입
    public SuccessResponse<String> JoinTeam(String teamUUID, String memberUUID);

    //동성 팀 탈퇴
    public SuccessResponse<String> leaveTeam(String memberUUID);

    // 동성 팀 및 이성 팀 조회
    public SuccessResponse<TeamResponse> getTeamByTeamUUID(String teamUUID);

    // 이성 팀 목록 조회
    public SuccessResponse<List<TeamResponse>> getOtherGenderTeams(String gender);

}
