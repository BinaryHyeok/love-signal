package kr.lovesignal.memberservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.memberservice.model.request.DeleteMemberRequest;
import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import kr.lovesignal.memberservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AuthController")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<SuccessResponse> signUp(@RequestBody SignUpRequest signUpRequest){

        SuccessResponse successResponse = authService.registerMember(signUpRequest);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(successResponse);
    }

    @PostMapping("/sign-in")
    @ApiOperation(value = "로그인")
    public ResponseEntity<SuccessResponse> singIn(@RequestBody SignInRequest signInRequest){

        SuccessResponse successResponse = authService.authenticate(signInRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<SuccessResponse> updateMember(@RequestBody UpdateMemberRequest updateMemberRequest){

        SuccessResponse successResponse = authService.updateMember(updateMemberRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<SuccessResponse> deleteMember(@RequestBody DeleteMemberRequest deleteMemberRequest){

        SuccessResponse successResponse = authService.deleteMember(deleteMemberRequest);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @GetMapping("/{memberUUID}")
    @ApiOperation(value = "회원정보 조회")
    public ResponseEntity<SuccessResponse> getMemberById(@PathVariable String memberUUID){

        SuccessResponse successResponse = authService.getMemberByUUID(memberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @GetMapping("/check/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복체크")
    public ResponseEntity<SuccessResponse> validateNickname(@PathVariable String nickname){

        SuccessResponse successResponse = authService.checkNicknameDuplicate(nickname);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

}
