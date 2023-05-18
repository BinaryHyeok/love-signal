<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/config/WebClientConfig.java
package kr.lovesignal.memberservice.config;
========
package kr.lovesignal.teamservice.config;
>>>>>>>> be_develop_team:Team_Service/src/main/java/kr/lovesignal/teamservice/config/WebClientConfig.java

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }
}