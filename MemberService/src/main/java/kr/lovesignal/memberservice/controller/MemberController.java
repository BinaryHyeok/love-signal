package kr.lovesignal.memberservice.controller;

//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
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
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final ResponseUtils responseUtils;

    @PutMapping
    public ResponseEntity<SuccessResponse> updateMember(@RequestBody UpdateMemberRequest updateMemberRequest){

        SuccessResponse successResponse = memberService.updateMember(updateMemberRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PutMapping("/{memberUUID}/receive-alarm")
    public ResponseEntity<String> updateReceiveAlarm(@PathVariable String memberUUID, @RequestParam String status){

        memberService.updateReceiveAlarm(memberUUID, status);

        String body = "푸시알람 허용되었습니다.";
        if("false".equals(status)){
            body = "푸시알람 거부되었습니다.";
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(body);
    }

    @DeleteMapping("/{memberUUID}")
    public ResponseEntity<SuccessResponse> deleteMember(@PathVariable String memberUUID){

        SuccessResponse successResponse = memberService.deleteMember(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @GetMapping("/{memberUUID}")
    public ResponseEntity<SuccessResponse> getMemberByUUID(@PathVariable String memberUUID){

        MemberResponse memberResponse = memberService.getMemberByUUID(memberUUID);
        MemberResponse memberResponseResult = memberService.getProfileImageByMemberApi(memberResponse).block();

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(memberResponseResult));
    }

    @GetMapping("/UUID/by/{email}")
    public ResponseEntity<String> getMemberByEmail(@PathVariable String email){

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(memberService.getMemberByEmail(email));
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerMember(
            @RequestBody SignUpRequest signUpRequest){

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(memberService.registerMember(signUpRequest));
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> validateNickname(@PathVariable String nickname){

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(memberService.checkNicknameDuplicate(nickname));
    }

}
