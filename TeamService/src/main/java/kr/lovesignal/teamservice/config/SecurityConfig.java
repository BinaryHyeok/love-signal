//package kr.lovesignal.teamservice.config;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//@RequiredArgsConstructor
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        http.csrf().disable();
//        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .httpBasic()
//                .and()
//                .exceptionHandling()
////                .accessDeniedHandler(customAccessDeniedHandler)
////                .authenticationEntryPoint(customAuthenticationEntryPoint)
//                .and()
//                .authorizeRequests()
//                .antMatchers(HttpMethod.OPTIONS, "/**/*").permitAll()
//                .antMatchers("/").permitAll() // swagger csrf 엔드포인트 오류를 지우기 위함 1
//                .antMatchers("/csrf").permitAll() // swagger csrf 엔드포인트 오류를 지우기 위함 2
//                .antMatchers("/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**").permitAll()
//                .antMatchers("/error/*").permitAll()
//                .antMatchers("/*/auth", "/*/auth/**").permitAll();
////                .anyRequest().authenticated();
//
////        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
//
//        return http.build();
//    }
//
////    @Bean
////    public WebSecurityCustomizer webSecurityCustomizer() {
////
////        return (web) -> web.ignoring().antMatchers(
////                "/v2/api-docs",
////                "/swagger-resources/**",
////                "/swagger-ui.html",
////                "/webjars/**",
////                "/swagger/**");
////    }
//
////    @Bean
////    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
////            throws Exception {
////        return authenticationConfiguration.getAuthenticationManager();
////    }
////
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
////    }
//
//}
