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

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AuthController")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/sign-up")
    @ApiOperation(value = "회원가입")
    public ResponseEntity<SuccessResponse> signUp(@RequestBody SignUpRequest signUpDto, HttpServletRequest request){

        SuccessResponse body = authService.registerMember(signUpDto, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(body);
    }

    @PostMapping("/sign-in")
    @ApiOperation(value = "로그인")
    public ResponseEntity<SuccessResponse> singIn(@RequestBody SignInRequest signInDto, HttpServletRequest request){

        SuccessResponse body = authService.authenticate(signInDto, request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(body);
    }

    @PutMapping
    @ApiOperation(value = "회원정보 수정")
    public ResponseEntity<SuccessResponse> updateMember(@RequestBody UpdateMemberRequest updateDto, HttpServletRequest request){

        SuccessResponse body = authService.updateMember(updateDto, request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(body);
    }

    @DeleteMapping
    @ApiOperation(value = "회원 탈퇴")
    public ResponseEntity<SuccessResponse> deleteMember(@RequestBody DeleteMemberRequest deleteDto, HttpServletRequest request){

        SuccessResponse body = authService.deleteMember(deleteDto, request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(body);
    }

    @GetMapping("/{memberId}")
    @ApiOperation(value = "회원정보 조회")
    public ResponseEntity<SuccessResponse> getMemberById(@PathVariable Long memberId, HttpServletRequest request){

        SuccessResponse body = authService.getMemberById(memberId, request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(body);
    }

//    @GetMapping("/nickname/check")
//    @ApiOperation(value = "닉네임 중복체크")
//    public ResponseEntity<SuccessResponse>

}
