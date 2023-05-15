package kr.lovesignal.authservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.SuccessResponse;
import kr.lovesignal.authservice.service.AuthService;
import kr.lovesignal.authservice.service.WebClientService;
import kr.lovesignal.authservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AuthController")
//@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final WebClientService webClientService;
    private final ResponseUtils responseUtils;

    @Value("${spring.security.oauth2.client.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.kakao.prod-redirect-uri}")
    private String prodRedirectUri;

    @Value("${spring.security.oauth2.client.kakao.prod-logout-redirect-uri}")
    private String prodLogoutRedirectUri;

    @Value("${spring.security.oauth2.client.kakao.dev-redirect-uri}")
    private String devRedirectUri;

    @Value("${spring.security.oauth2.client.kakao.dev-logout-redirect-uri}")
    private String devLogoutRedirectUri;


    @GetMapping("/kakao/login")
    public void kakaoOauthLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String redirect_uri;
        System.out.println("======================");
        System.out.println(request.getServerName());
        if("localhost".equals(request.getServerName())){
            redirect_uri = String.format("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=%s&redirect_uri=%s", clientId, devRedirectUri);
        }
        else{
            redirect_uri = String.format("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=%s&redirect_uri=%s", clientId, prodRedirectUri);
        }
        response.sendRedirect(redirect_uri);

    }

    @GetMapping("/kakao/logout")
    public void kakaoOauthLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String redirect_uri;
        System.out.println("======================");
        System.out.println(request.getServerName());
        if("localhost".equals(request.getServerName())){
            redirect_uri = String.format("https://kauth.kakao.com/oauth/logout?client_id=%s&logout_redirect_uri=%s", clientId, devLogoutRedirectUri);
        }
        else{
            redirect_uri = String.format("https://kauth.kakao.com/oauth/logout?client_id=%s&logout_redirect_uri=%s", clientId, prodLogoutRedirectUri);
        }
        response.sendRedirect(redirect_uri);
    }

    @PostMapping("/sign-in")
    @ApiOperation(value = "로그인")
    public ResponseEntity<SuccessResponse> signIn(@RequestParam String authorizationCode, HttpServletRequest request){

        SuccessResponse successResponse = authService.signIn(request, authorizationCode);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PostMapping("/sign-up")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<SuccessResponse> signUp(
            @RequestBody SignUpRequest signUpRequest,
            @RequestHeader("X-Auth_Token") String accessToken){

        String strMemberUUID = authService.registerMember(signUpRequest, accessToken);

        webClientService.createSystemChatRoomApi(strMemberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(strMemberUUID));
    }

    @GetMapping("/check/nickname/{nickname}")
    @ApiOperation(value = "닉네임 중복체크")
    public ResponseEntity<SuccessResponse> validateNickname(@PathVariable String nickname){

        SuccessResponse successResponse = authService.checkNicknameDuplicate(nickname);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PostMapping("/refresh")
    @ApiOperation(value = "리프레쉬토큰으로 토근 재발급")
    public ResponseEntity<SuccessResponse> refreshTokens(
            @RequestHeader("X-Auth_Token") String refreshToken){

        SuccessResponse successResponse = authService.makeRefreshResponse(refreshToken);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }
}
