package kr.lovesignal.apigateway.filter;

import com.netflix.discovery.converters.Auto;
import kr.lovesignal.apigateway.webclient.KauthAccountResponse;
import kr.lovesignal.apigateway.webclient.WebClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
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
                return handleUnAuthorized(exchange);
            }

            List<String> token = request.getHeaders().get("X-Auth_Token");
            List<String> id = request.getHeaders().get("X-Auth_ID");
            String accessToken = Objects.requireNonNull(token).get(0);
            String kakaoId = Objects.requireNonNull(id).get(0);

            KauthAccountResponse kauthAccountResponse = webClientService.getKakaoAccountApi(accessToken).block();

            if(!kauthAccountResponse.getId().toString().equals(kakaoId)){
                return handleUnAuthorized(exchange);
            }
            System.out.println("========================");
            System.out.println(kakaoId);;
            System.out.println("========================");
            return chain.filter(exchange);
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
