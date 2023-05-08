package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import kr.lovesignal.authservice.model.response.SignInResponse;
import kr.lovesignal.authservice.model.response.SuccessResponse;

public interface AuthService {

    String registerMember(SignUpRequest signUpRequest, KauthAccountResponse kauthAccountResponse);

    SuccessResponse<SignInResponse> signIn(KauthTokenResponse kauthTokenResponse, KauthAccountResponse kauthAccountResponse);

    SuccessResponse<String> checkNicknameDuplicate(String nickname);

    SuccessResponse<SignInResponse> makeRefreshResponse(KauthTokenResponse kauthTokenResponse, KauthAccountResponse kauthAccountResponse);

}
