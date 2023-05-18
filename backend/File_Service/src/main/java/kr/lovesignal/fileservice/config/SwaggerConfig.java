<<<<<<<< HEAD:Team_Service/src/main/java/kr/lovesignal/teamservice/config/SwaggerConfig.java
package kr.lovesignal.teamservice.config;
========
package kr.lovesignal.fileservice.config;
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/config/SwaggerConfig.java

import com.google.common.base.Predicate;
import com.google.common.base.Predicates;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@ConditionalOnExpression(value = "${swagger.enable:false}")
@Configuration
@EnableSwagger2
public class SwaggerConfig {

<<<<<<<< HEAD:Team_Service/src/main/java/kr/lovesignal/teamservice/config/SwaggerConfig.java
    private static final String API_NAME = "Love Signal - Team API";
    private static final String API_VERSION = "1.0.0";
    private static final String API_DESCRIPTION = "Team API 명세서";
========
    private static final String API_NAME = "Love Signal - File API";
    private static final String API_VERSION = "1.0.0";
    private static final String API_DESCRIPTION = "File API 명세서";
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/config/SwaggerConfig.java

    @Bean
    public Docket allApi() {
        return buildDocket("_전체_", Predicates
                .or(PathSelectors.ant(  "/**")));
    }

    @Bean
    public Docket TeamApi() {
<<<<<<<< HEAD:Team_Service/src/main/java/kr/lovesignal/teamservice/config/SwaggerConfig.java
        return buildDocket("팀 ", Predicates
                .or(PathSelectors.ant( "/team"),
                        PathSelectors.ant("team/**")));
========
        return buildDocket("파일 ", Predicates
                .or(PathSelectors.ant( "/file"),
                        PathSelectors.ant("file/**")));
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/config/SwaggerConfig.java
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
<<<<<<<< HEAD:Team_Service/src/main/java/kr/lovesignal/teamservice/config/SwaggerConfig.java
========

//    // swagger에서 jwt 토큰값 넣기위한 설정
//    private ApiKey apiKey() {
//        return new ApiKey("JWT", "Authorization", "header"); // <type> : JWT
//        // return new ApiKey("Bearer", "Authorization", "header"); // <type> : Bearer
//    }
//
//    private SecurityContext securityContext() {
//        return SecurityContext.builder().securityReferences(defaultAuth()).build();
//    }
//
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return Arrays.asList(new SecurityReference("JWT", authorizationScopes));
//    }
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/config/SwaggerConfig.java
}
