package kr.lovesignal.teamservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "TeamController")
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/{memberUUID}")
    @ApiOperation(value = "팀 생성")
    public ResponseEntity<SuccessResponse> createTeam(@PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.createTeam(memberUUID);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(successResponse);
    }

    @PostMapping("/{teamUUID}/join/{memberUUID}")
    @ApiOperation(value = "팀 참가")
    public ResponseEntity<SuccessResponse> joinTeam(@PathVariable String teamUUID, @PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.JoinTeam(teamUUID, memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @DeleteMapping("/{memberUUID}")
    @ApiOperation(value = "팀 탈퇴")
    public ResponseEntity<SuccessResponse> deleteTeam(@PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.leaveTeam(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @GetMapping("/{teamUUID}")
    @ApiOperation(value = "팀 조회")
    public ResponseEntity<SuccessResponse> getTeamByTeamUUID(@PathVariable String teamUUID){

        SuccessResponse successResponse = teamService.getTeamByTeamUUID(teamUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    //이성팀불러오기
    @PostMapping("/opposite-gender/teams")
    @ApiOperation(value = "이성 팀 목록 조회")
    public ResponseEntity<SuccessResponse> getOppositeGenderTeams(
            @RequestParam String gender,
            @RequestParam int size,
            @RequestBody GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest){

        SuccessResponse successResponse = teamService.getOppositeGenderTeams(gender, size, getOppositeGenderTeamsRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

//    @GetMapping("/{teamUUID}/meeting")
//    @ApiOperation(value = "미팅 신청받은 목록 불러오기")
//    public ResponseEntity<SuccessResponse> getMeetingRequests(@PathVariable String teamUUID){
//
//    }
//
//    @PostMapping("/{teamUUID}/meeting/{oppositeTeamUUID}/request")
//    @ApiOperation(value = "미팅 신청")
//    public ResponseEntity<SuccessResponse> createMeetingRequest(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){
//
//    }
//
//    @DeleteMapping("/{teamUUID}/meeting/{oppositeTeamUUID}/accpet")
//    @ApiOperation(value = "미팅 수락")
//    public ResponseEntity<SuccessResponse> deleteAllMeetingRequests(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){
//
//    }
//
//    @DeleteMapping("/{teamUUID}/meeting/{oppositeTeamUUID}/reject")
//    @ApiOperation(value = "미팅 거절")
//    public ResponseEntity<SuccessResponse> deleteMeetingRequest(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){
//
//    }
}
