package kr.lovesignal.teamservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.teamservice.model.request.CreateTeamRequest;
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

    @PostMapping
    public ResponseEntity<SuccessResponse> createTeam(@RequestBody CreateTeamRequest createTeamRequest){

        SuccessResponse successResponse = teamService.
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

}
