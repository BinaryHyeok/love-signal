package kr.lovesignal.teamservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.teamservice.model.request.CreateTeamRequest;
import kr.lovesignal.teamservice.model.request.DeleteTeamRequest;
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
public class TeamController {

    private final TeamService teamService;

    @PostMapping("/{memberUUID}")
    @ApiOperation(value = "팀 생성")
    public ResponseEntity<SuccessResponse> createTeam(@PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.createTeam(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PostMapping("/{teamUUID}/join/{memberUUID}")
    @ApiOperation(value = "팀 참가")
    public ResponseEntity<SuccessResponse> joinTeam(@PathVariable String teamUUID, @PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.JoinTeam(teamUUID, memberUUID);


    }

    @DeleteMapping("/{memberUUID}")
    @ApiOperation(value = "팀 탈퇴")
    public ResponseEntity<SuccessResponse> deleteTeam(@PathVariable String memberUUID){

        SuccessResponse successResponse = teamService.leaveTeam(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

//    @GetMapping("/{teamUUID}")
//    @ApiOperation(value = "자신의 팀 조회")
//    public ResponseEntity<SuccessResponse> getTeamByUUID(String teamUUID){
//
//    }

    // 이성팀 목록 불러오기

    //이성팀불러오기


}
