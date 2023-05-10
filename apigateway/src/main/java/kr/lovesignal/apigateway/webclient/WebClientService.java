package kr.lovesignal.apigateway.webclient;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class WebClientService {

    private final WebClient webClient;

    @Value("${spring.security.oauth2.client.kakao.account-uri}")
    private String accountUri;

    public Mono<KauthAccountResponse> getKakaoAccountApi(String accessToken) {
        String authorization = "Bearer " + accessToken;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", authorization);

        return webClient.()
                .uri(accountUri)
                .headers(header -> header.addAll(headers))
                .retrieve()
                .bodyToMono(KauthAccountResponse.class);
    }

}
