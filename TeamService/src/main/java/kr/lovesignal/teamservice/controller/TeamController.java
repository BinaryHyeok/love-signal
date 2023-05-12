package kr.lovesignal.teamservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import kr.lovesignal.teamservice.service.TeamService;
import kr.lovesignal.teamservice.service.WebClientService;
import kr.lovesignal.teamservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "TeamController")
@RequestMapping("/team")
public class TeamController {

    private final TeamService teamService;
    private final WebClientService webClientService;
    private final ResponseUtils responseUtils;

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
    public ResponseEntity<String> joinTeam(@PathVariable String teamUUID, @PathVariable String memberUUID){

        int memberCount = teamService.JoinTeam(teamUUID, memberUUID);

        if(memberCount == 3){
            List<String> memberUUIDs = teamService.makeChatRoomMembers(teamUUID);
            webClientService.makeChatRoomApi(memberUUIDs);
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("팀에 참가하였습니다.");
    }

    @DeleteMapping("/{memberUUID}")
    @ApiOperation(value = "팀 탈퇴")
    public ResponseEntity<String> leaveTeam(@PathVariable String memberUUID){

        boolean[] result = teamService.leaveTeam(memberUUID);
        boolean isMeeting = result[0];
        boolean isRemainTeam = result[1];
        boolean isBuilding = result[2];

        List<String> memberUUIDs;
        String type;
        if(isMeeting) {
            if (isRemainTeam) {
                // 한사람이 모든 채팅방에서 나간다.
                memberUUIDs = teamService.deleteMemberFromTeam(memberUUID);
            }
            else{
                // 미팅과 팀 해체 및 모든 채팅방에서 나간다.
                memberUUIDs = teamService.deleteMeetingTeam(memberUUID);
            }
        }
        else{
            //팀 해체
            memberUUIDs = teamService.deleteTeamByMember(memberUUID);
        }

        if(isBuilding){
            webClientService.exitChatRoomApi(memberUUIDs);
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("팀에서 탈퇴하였습니다.");
    }

    @GetMapping("/{teamUUID}")
    @ApiOperation(value = "팀 조회")
    public ResponseEntity<SuccessResponse> getTeamByTeamUUID(@PathVariable String teamUUID){

        Team team = teamService.getTeamByTeamUUID(teamUUID);
        Team teamResult = webClientService.getProfileImagesByTeamApi(team).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(teamResult));
    }

    //이성팀불러오기
    @PostMapping("/opposite-gender/teams")
    @ApiOperation(value = "이성 팀 목록 조회")
    public ResponseEntity<SuccessResponse> getOppositeGenderTeams(
            @RequestParam String gender,
            @RequestParam int size,
            @RequestBody GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest){

        TeamResponse teamResponse = teamService.getOppositeGenderTeams(gender, size, getOppositeGenderTeamsRequest);
        TeamResponse teamResponseResult = webClientService.getProfileImagesByTeamsApi(teamResponse).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(teamResponseResult));
    }

    @GetMapping("/{teamUUID}/received-meetings")
    @ApiOperation(value = "미팅 신청받은 목록 불러오기")
    public ResponseEntity<SuccessResponse> getReceivedMeetings(@PathVariable String teamUUID){

        TeamResponse teamResponse = teamService.getReceivedMeetings(teamUUID);
        TeamResponse teamResponseResult = webClientService.getProfileImagesByTeamsApi(teamResponse).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(teamResponseResult));
    }

    @GetMapping("/{teamUUID}/sent-meetings")
    @ApiOperation(value = "미팅 신청한 목록 불러오기")
    public ResponseEntity<SuccessResponse> getSentMeetings(@PathVariable String teamUUID){

        TeamResponse teamResponse = teamService.getSentMeetings(teamUUID);
        TeamResponse teamResponseResult = webClientService.getProfileImagesByTeamsApi(teamResponse).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(teamResponseResult));
    }

    @PostMapping("/{teamUUID}/send-meeting/{oppositeTeamUUID}")
    @ApiOperation(value = "미팅 신청")
    public ResponseEntity<SuccessResponse> createMeeting(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){

        SuccessResponse successResponse = teamService.createMeeting(teamUUID, oppositeTeamUUID);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(successResponse);
    }

    @DeleteMapping("/{teamUUID}/accpet-meeting/{oppositeTeamUUID}")
    @ApiOperation(value = "미팅 수락")
    public ResponseEntity<String> accpetMeeting(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){

        teamService.accpetMeeting(teamUUID, oppositeTeamUUID);

        List<String> memberUUIDs = teamService.makeChatRoomMembers(teamUUID, oppositeTeamUUID);
        webClientService.makeChatRoomApi(memberUUIDs);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("미팅이 수락 되었습니다.");
    }

    @DeleteMapping("/{teamUUID}/reject-meeting/{oppositeTeamUUID}")
    @ApiOperation(value = "미팅 거절")
    public ResponseEntity<SuccessResponse> rejectMeeting(@PathVariable String teamUUID, @PathVariable String oppositeTeamUUID){

        log.debug("========================미팅거절===============");
        SuccessResponse successResponse = teamService.rejectMeeting(teamUUID, oppositeTeamUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }
}
