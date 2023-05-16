package kr.lovesignal.chattingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleServiceImpl {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;
    private final ScheduledExecutorService executorService;

//    @Scheduled(cron = "0/30 * * * * *")
//    public void schedule() {
//        chatRoomService.secretChatRoomExpiredT();
//        chatService.expiredSelectMessage();
//        chatRoomService.redisToMysql();;
//    }

    @Scheduled(cron = "0 * * * * *", zone = "Asia/Seoul") // 초 분 시 일 월 요일 - 발표용
    public void saveSelectMessage() {
        chatService.saveSelectMessage();

        executorService.schedule(() -> {
            chatService.expiredSelectMessage();
            chatRoomService.redisToMysql();
            // B 또는 C 메소드가 실행된 시점에서 5분 뒤에 ChatRoomService의 D 메소드 실행
            executorService.schedule(() -> {
                chatRoomService.secretChatRoomExpiredT();
                chatRoomService.chatRoomExpired();
            }, 3, TimeUnit.MINUTES);
        }, 3, TimeUnit.MINUTES);
    }

}
