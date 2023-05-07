package kr.lovesignal.authservice.service;


import kr.lovesignal.authservice.exception.CustomException;
import kr.lovesignal.authservice.exception.ErrorCode;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class WebClientServiceImpl implements WebClientService{

    private final WebClient webClient;

    @Value("${spring.security.oauth2.client.kakao.token-uri}")
    private String tokenUri;

    @Value("${spring.security.oauth2.client.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${spring.security.oauth2.client.kakao.account-uri}")
    private String accountUri;

    @Value("${spring.security.oauth2.client.kakao.logout-uri}")
    private String logoutUri;

    @Override
    public Mono<KauthTokenResponse> getKakaoTokenApi(String authorizationCode) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("grant_type", "authorization_code");
        data.add("redirect_uri", redirectUri);
        data.add("client_id", clientId);
        data.add("code", authorizationCode);

        return webClient.post()
                .uri(tokenUri)
                .headers(header -> header.addAll(headers))
                .bodyValue(data)
                .retrieve()
                .bodyToMono(KauthTokenResponse.class);
    }

    @Override
    public Mono<KauthAccountResponse> getKakaoAccountApi(String accessToken) {
        String authorization = "Bearer " + accessToken;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", authorization);

        return webClient.get()
                .uri(accountUri)
                .headers(header -> header.addAll(headers))
                .retrieve()
                .bodyToMono(KauthAccountResponse.class);
    }

    @Override
    public Mono<KauthTokenResponse> refreshKakaoTokenApi(String refreshToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("grant_type", "refresh_token");
        data.add("client_id", clientId);
        data.add("refresh_token", refreshToken);

        return webClient.post()
                .uri(tokenUri)
                .headers(header -> header.addAll(headers))
                .bodyValue(data)
                .retrieve()
                .bodyToMono(KauthTokenResponse.class);
    }

    @Override
    public Mono kakaoLogoutApi(String accessToken) {
        String authorization = "Bearer " + accessToken;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", authorization);

        return webClient.post()
                .uri(logoutUri)
                .headers(header -> header.addAll(headers))
                .retrieve()
                .bodyToMono(Mono.class);
    }

    @Override
    public void createSystemChatRoomApi(String strMemberUUID){
        String uri = "http://localhost:8080/chatRoom/System/" + strMemberUUID;
        webClient.post()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
