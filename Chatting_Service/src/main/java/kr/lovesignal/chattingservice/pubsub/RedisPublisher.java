package kr.lovesignal.chattingservice.pubsub;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ChatService chatService;

    public void publish(ChannelTopic topic, ReqChatMessage reqChatMessage) {
        chatService.saveChatMessage(reqChatMessage);
        redisTemplate.convertAndSend(topic.getTopic(), reqChatMessage);
    }
}
