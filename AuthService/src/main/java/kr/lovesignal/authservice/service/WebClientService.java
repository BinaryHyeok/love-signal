package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import reactor.core.publisher.Mono;

public interface WebClientService {

    Mono<KauthTokenResponse> getKakaoTokenApi(String authorizationCode);

    Mono<KauthAccountResponse> getKakaoAccountApi(String accessToken);

    Mono<KauthTokenResponse> refreshKakaoTokenApi(String refreshToken);

//    Mono<KauthAccountResponse> kakaoLogoutApi(String accessToken);
//
//    void kakaoWithLogoutApi();

    void createSystemChatRoomApi(String strMemberUUID);

    Mono<String> getMemberUUID(String email);

    Mono<String> registerMember(SignUpRequest signUpRequest);

    Mono<Boolean> validateNickname(String nickname);
}
