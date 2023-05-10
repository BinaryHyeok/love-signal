package kr.lovesignal.authservice.service;


import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import kr.lovesignal.authservice.util.UriUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
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
    private final UriUtils uriUtils;

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

    @Value("${server.port}")
    private int port;



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
        String uri = "http://localhost:9000/chatRoom/System/" + strMemberUUID;

        if(port == 0){
            uri = uriUtils.getServiceUri("chatting-service") + "/chatRoom/System/" + strMemberUUID;
        }

        System.out.println(uri);
        webClient.post()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    @Override
    public Mono<String> getMemberUUID(String email) {
        String uri = "http://localhost:9000/member/UUID/by/" + email;

        System.out.println("==================================");
        System.out.println("포트전");
        System.out.println("==================================");
        System.out.println(port);
        System.out.println(uri);

        if(port == 0){
            uri = uriUtils.getServiceUri("member-service") + "/member/UUID/by/" + email;
        }
        System.out.println(uri);

        System.out.println(uri);
        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class);
    }

    @Override
    public Mono<String> registerMember(SignUpRequest signUpRequest) {
        String uri = "http://localhost:9000/member/register";

        if(port == 0){
            uri = uriUtils.getServiceUri("member-service") + "/member/register/";
        }

        System.out.println(uri);
        return webClient.post()
                .uri(uri)
                .bodyValue(signUpRequest)
                .retrieve()
                .bodyToMono(String.class);
    }

    @Override
    public Mono<Boolean> validateNickname(String nickname) {
        String uri = "http://localhost:9000/member/check/nickname/" + nickname;
        if(port == 0){
            uri = uriUtils.getServiceUri("member-service") + "/member/check/nickname/" + nickname;
        }

        System.out.println(uri);

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(Boolean.class);
    }
}
