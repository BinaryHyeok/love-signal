package kr.lovesignal.authservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import kr.lovesignal.authservice.model.response.SuccessResponse;
import kr.lovesignal.authservice.service.AuthService;
import kr.lovesignal.authservice.service.WebClientService;
import kr.lovesignal.authservice.util.ResponseUtils;
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
    private final WebClientService webClientService;
    private final ResponseUtils responseUtils;

    @PostMapping("/sign-in")
    @ApiOperation(value = "로그인")
    public ResponseEntity<SuccessResponse> signIn(@RequestParam String authorizationCode){

        KauthTokenResponse kauthTokenResponse =
                webClientService.getKakaoTokenApi(authorizationCode).block();

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(kauthTokenResponse.getAccess_token()).block();

        SuccessResponse successResponse =
                authService.signIn(kauthTokenResponse, kauthAccountResponse);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PostMapping("/sign-up")
    @ApiOperation(value = "회원 가입")
    public ResponseEntity<SuccessResponse> signUp(
            @RequestBody SignUpRequest signUpRequest,
            @RequestHeader("X-Auth_Token") String accessToken){

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(accessToken).block();

        String strMemberUUID = authService.registerMember(signUpRequest, kauthAccountResponse);

        webClientService.createSystemChatRoomApi(strMemberUUID);

        SuccessResponse successResponse = responseUtils.buildSuccessResponse(strMemberUUID);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(responseUtils.buildSuccessResponse(successResponse));
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

        KauthTokenResponse kauthTokenResponse = webClientService.refreshKakaoTokenApi(refreshToken).block();

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(kauthTokenResponse.getAccess_token()).block();

        SuccessResponse successResponse = authService.makeRefreshResponse(kauthTokenResponse, kauthAccountResponse);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(successResponse);
    }

    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃")
    public ResponseEntity<String> logout(@RequestHeader("X-Auth_Token") String accessToken){

        System.out.println(accessToken);
        webClientService.kakaoLogoutApi(accessToken).block();
        System.out.println("string");

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("로그아웃 되었습니다.");
    }

}
