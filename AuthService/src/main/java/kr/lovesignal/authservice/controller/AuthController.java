package kr.lovesignal.authservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
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

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "AuthController")
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final WebClientService webClientService;
    private final ResponseUtils responseUtils;

    @Value("${spring.security.oauth2.client.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.kakao.redirect-uri}")
    private String redirectUri;

    @GetMapping("/kakao/login")
    public void kakaoOauthLogin(HttpServletResponse response) throws IOException {
        String redirect_uri = String.format("https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=%s&redirect_uri=%s", clientId, redirectUri);
        response.sendRedirect(redirect_uri);
    }

    @PostMapping("/sign-in")
    @ApiOperation(value = "로그인")
    public ResponseEntity<SuccessResponse> signIn(@RequestParam String authorizationCode){

        SuccessResponse successResponse = authService.signIn(authorizationCode);

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

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃")
    public ResponseEntity<String> logout(@RequestHeader("X-Auth_Token") String accessToken){

        KauthAccountResponse k = webClientService.kakaoLogoutApi(accessToken).block();
        System.out.println("토큰 만료 완료");
        System.out.println(k.getId());
        webClientService.kakaoWithLogoutApi();
        System.out.println("카카오톡 로그아웃 완료");


        return ResponseEntity
                .status(HttpStatus.OK)
                .body("로그아웃 되었습니다.");
    }


}
