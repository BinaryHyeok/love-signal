<<<<<<<< HEAD:Member_Service/src/main/java/kr/lovesignal/memberservice/config/WebConfig.java
package kr.lovesignal.memberservice.config;
========
package kr.lovesignal.fileservice.config;
>>>>>>>> be_develop_file:File_Service/src/main/java/kr/lovesignal/fileservice/config/WebConfig.java

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

//    @Value("${file.app.url}")
//    private String APP_URL;
//
//    @Value("${file.app.windowPath}")
//    private String WINDOW_PATH;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler(APP_URL)
//                .addResourceLocations(WINDOW_PATH);
    }
}