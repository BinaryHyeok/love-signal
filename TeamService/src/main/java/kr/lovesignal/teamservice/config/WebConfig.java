package kr.lovesignal.teamservice.config;

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