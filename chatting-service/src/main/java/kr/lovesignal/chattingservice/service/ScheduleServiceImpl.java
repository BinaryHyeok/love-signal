package kr.lovesignal.chattingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleServiceImpl {

    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    @Scheduled(cron = "0/30 * * * * *")
    public void schedule() {
        chatRoomService.secretChatRoomExpiredT();
        chatService.expiredSelectMessage();
        chatRoomService.redisToMysql();;
    }

}
