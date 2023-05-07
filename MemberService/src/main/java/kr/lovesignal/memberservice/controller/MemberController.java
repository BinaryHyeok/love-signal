package kr.lovesignal.memberservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import kr.lovesignal.memberservice.service.MemberService;
import kr.lovesignal.memberservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "MemberController")
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final ResponseUtils responseUtils;

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<SuccessResponse> updateMember(@RequestBody UpdateMemberRequest updateMemberRequest){

        SuccessResponse successResponse = memberService.updateMember(updateMemberRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @DeleteMapping("/{memberUUID}")
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<SuccessResponse> deleteMember(@PathVariable String memberUUID){

        SuccessResponse successResponse = memberService.deleteMember(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @GetMapping("/{memberUUID}")
    @ApiOperation(value = "회원정보 조회")
    public ResponseEntity<SuccessResponse> getMemberById(@PathVariable String memberUUID){

        MemberResponse memberResponse = memberService.getMemberByUUID(memberUUID);
        MemberResponse memberResponseResult = memberService.getProfileImageByMemberApi(memberResponse).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(memberResponseResult));
    }

}
