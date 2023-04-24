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

//    @PostMapping("/sign-up")
//    @ApiOperation(value = "회원가입")
//    public ResponseEntity<SuccessResponse> signUp(SignUpRequest signUpDto, HttpServletRequest request){
//
//    }
//
//    @PostMapping("/sign-in")
//    @ApiOperation(value = "로그인")
//    public ResponseEntity<SuccessResponse> singIn(SignInRequest signInDto, HttpServletRequest request){
//
//    }
//
//    @PutMapping
//    @ApiOperation(value = "회원정보 수정")
//    public ResponseEntity<SuccessResponse> updateMember(UpdateMemberRequest updateDto, HttpServletRequest request){
//
//    }
//
//    @DeleteMapping
//    @ApiOperation(value = "회원 탈퇴")
//    public ResponseEntity<SuccessResponse> deleteMember(DeleteMemberRequest deleteDto, HttpServletRequest request){
//
//    }
//
//    @GetMapping("/{memberId}")
//    @ApiOperation(value = "회원정보 조회")
//    public ResponseEntity<SuccessResponse> getMemberById(@PathVariable Long memberId, HttpServletRequest request){
//
//    }
}
