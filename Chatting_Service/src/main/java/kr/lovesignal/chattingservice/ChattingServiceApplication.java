package kr.lovesignal.chattingservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ChattingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChattingServiceApplication.class, args);
    }

}
