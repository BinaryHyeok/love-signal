package kr.lovesignal.authservice.service;


import kr.lovesignal.authservice.exception.CustomException;
import kr.lovesignal.authservice.exception.ErrorCode;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.KauthAccountResponse;
import kr.lovesignal.authservice.model.response.KauthTokenResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
@RequiredArgsConstructor
public class WebClientServiceImpl implements WebClientService{

    private final WebClient webClient;
    private final DiscoveryClient discoveryClient;
    private final LoadBalancerClient loadBalancerClient;

    @Value("${spring.security.oauth2.client.kakao.token-uri}")
    private String tokenUri;

    @Value("${spring.security.oauth2.client.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.kakao.prod-redirect-uri}")
    private String prodRedirectUri;

    @Value("${spring.security.oauth2.client.kakao.dev-redirect-uri}")
    private String devRedirectUri;

    @Value("${spring.security.oauth2.client.kakao.account-uri}")
    private String accountUri;

    @Value("${server.port}")
    private int port;

    @Override
    public Mono<KauthTokenResponse> getKakaoTokenApi(String authorizationCode, String env) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> data = new LinkedMultiValueMap<>();
        data.add("grant_type", "authorization_code");
        if("localhost".equals(env)){
            data.add("redirect_uri", devRedirectUri);
        }
        else{
            data.add("redirect_uri", prodRedirectUri);
        }
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

//    @Override
//    public Mono<KauthAccountResponse> kakaoLogoutApi(String accessToken) {
//        String authorization = "Bearer " + accessToken;
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
//        headers.add("Authorization", authorization);
//
//        return webClient.post()
//                .uri(logoutUri)
//                .headers(header -> header.addAll(headers))
//                .retrieve()
//                .bodyToMono(KauthAccountResponse.class);
//    }
//
//    @Override
//    public void kakaoWithLogoutApi() {
//        String uri = "https://kauth.kakao.com/oauth/logout?client_id=" + clientId + "&logout_redirect_uri=" + logoutRedirectUri;
//
//        webClient.get()
//                .uri(uri)
//                .retrieve()
//                .bodyToMono(String.class)
//                .subscribe();
//    }

    @Override
    public void createSystemChatRoomApi(String strMemberUUID){
        String uri = "http://localhost:9000/chatRoom/System/" + strMemberUUID;

        List<ServiceInstance> instances = discoveryClient.getInstances("chatting-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 9999){
            uri = instances.get(0).getUri().toString() + "/api/chatRoom/System/" + strMemberUUID;
        }

        webClient.post()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    @Override
    public Mono<String> getMemberUUID(String email) {
        String uri = "http://localhost:9000/member/UUID/by/" + email;

        List<ServiceInstance> instances = discoveryClient.getInstances("member-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 9999){
            uri = instances.get(0).getUri().toString() + "/api/member/UUID/by/" + email;
        }

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class);
    }

    @Override
    public Mono<String> registerMember(SignUpRequest signUpRequest) {
        String uri = "http://localhost:9000/member/register";

        List<ServiceInstance> instances = discoveryClient.getInstances("member-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 9999){
            uri = instances.get(0).getUri().toString() + "/api/member/register";
        }

        return webClient.post()
                .uri(uri)
                .bodyValue(signUpRequest)
                .retrieve()
                .bodyToMono(String.class);
    }

    @Override
    public Mono<Boolean> validateNickname(String nickname) {
        String uri = "http://localhost:9000/member/check/nickname/" + nickname;

        List<ServiceInstance> instances = discoveryClient.getInstances("member-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 9999){
            uri = instances.get(0).getUri().toString() + "/api/member/check/nickname/" + nickname;
        }

        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(Boolean.class);
    }
}
