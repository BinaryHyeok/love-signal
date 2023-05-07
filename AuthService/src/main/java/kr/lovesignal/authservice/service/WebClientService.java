package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import reactor.core.publisher.Mono;

public interface WebClientService {

    Mono<KauthTokenResponse> getKakaoTokenApi(String authorizationCode);

    Mono<KauthAccountResponse> getKakaoAccountApi(String accessToken);

    Mono<KauthTokenResponse> refreshKakaoTokenApi(String refreshToken);

    Mono kakaoLogoutApi(String accessToken);

    void createSystemChatRoomApi(String strMemberUUID);
}
