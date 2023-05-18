package kr.lovesignal.teamservice.config;

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@ConditionalOnExpression(value = "${swagger.enable:false}")
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private static final String API_NAME = "Love Signal - Team API";
    private static final String API_VERSION = "1.0.0";
    private static final String API_DESCRIPTION = "Team API 명세서";

    @Bean
    public Docket allApi() {
        return buildDocket("_전체_", Predicates
                .or(PathSelectors.ant(  "/**")));
    }

    @Bean
    public Docket TeamApi() {
        return buildDocket("팀 ", Predicates
                .or(PathSelectors.ant( "/team"),
                        PathSelectors.ant("team/**")));
    }


    public Docket buildDocket(String groupName, Predicate<String> predicates) {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()) // API 문서에 대한 설명
                .useDefaultResponseMessages(false)
                .groupName(groupName)
                .select()
                .paths(predicates)
                .apis(RequestHandlerSelectors.basePackage("kr.lovesignal"))
                .paths(PathSelectors.any())
                .build();
    }

    public ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title(API_NAME)
                .version(API_VERSION)
                .description(API_DESCRIPTION)
                .build();
    }
}
