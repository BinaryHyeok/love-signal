package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import kr.lovesignal.authservice.model.response.SignInResponse;
import kr.lovesignal.authservice.model.response.SuccessResponse;

import javax.servlet.http.HttpServletRequest;

public interface AuthService {

    String registerMember(SignUpRequest signUpRequest, String accessToken);

    SuccessResponse<SignInResponse> signIn(HttpServletRequest request, String authorizationCode);

    SuccessResponse<String> checkNicknameDuplicate(String nickname);

    SuccessResponse<SignInResponse> makeRefreshResponse(String refreshToken);

}
