package kr.lovesignal.apigateway.filter;

import kr.lovesignal.apigateway.webclient.KauthAccountResponse;
import kr.lovesignal.apigateway.webclient.WebClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Objects;

@Component
public class AuthenticationGatewayFilterFactory extends AbstractGatewayFilterFactory<AuthenticationGatewayFilterFactory.Config> {

    @Autowired
    private WebClientService webClientService;

    public AuthenticationGatewayFilterFactory(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            if(!request.getHeaders().containsKey("X-Auth_Token") || !request.getHeaders().containsKey("X-Auth_ID")){
                System.out.println("인증에러:토큰 또는 아이디 헤더가 없습니다.");
                return handleUnAuthorized(exchange);
            }

            List<String> token = request.getHeaders().get("X-Auth_Token");
            List<String> id = request.getHeaders().get("X-Auth_ID");
            String accessToken = Objects.requireNonNull(token).get(0);
            String kakaoId = Objects.requireNonNull(id).get(0);
            return webClientService.getKakaoAccountApi(accessToken)
                    .flatMap(accountResponse -> {
                        if (!accountResponse.getId().toString().equals(kakaoId)) {
                            System.out.println("인증에러:아이디가 맞지 않음");
                            return handleUnAuthorized(exchange);
                        }
                        return chain.filter(exchange);
                    })
                    .onErrorResume(error -> {
                        System.out.println(error);
                        System.out.println("인증에러:api 요청 못가져옴");
                        return handleUnAuthorized(exchange);
                    });
        });
    }

    private Mono<Void> handleUnAuthorized(ServerWebExchange exchange) {
        ServerHttpResponse response = exchange.getResponse();

        response.setStatusCode(HttpStatus.UNAUTHORIZED);
        return response.setComplete();
    }

    public static class Config {

    }
}
