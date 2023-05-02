package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRepository {

    private final String AllMessageList = "allMessageList";
    private final String RoomMessageList = "RoomMessageList";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Long, ChatMessage> opsHashMessage;
    private HashOperations<String, String, List<ResChatMessage>> opsHashMessageList;

    @PostConstruct
    public void init() {
        opsHashMessage = redisTemplate.opsForHash();
        opsHashMessageList = redisTemplate.opsForHash();
    }

    /**
     * 메세지 조회
     */
    public List<ResChatMessage> getChatMessages(String roomUUID) {
        List<ResChatMessage> list = opsHashMessageList.get(RoomMessageList, roomUUID);
        return list;
    }


    /**
     * 메세지 저장
     */
    public void saveChatMessage(ResChatMessage message) {
        saveChatMessageToAll(message);
        saveChatMessageToRoom(message);
    }

    public void saveChatMessageToAll(ResChatMessage message) {
        List<ResChatMessage> list = opsHashMessageList.get(AllMessageList, "1");
        if(list == null) {
            list = new ArrayList<>();
        }
        int redisMessageId = list.size() + 1;
        message.setRedis_message_id(redisMessageId);
        list.add(message);
        opsHashMessageList.put(AllMessageList, "1", list);
    }

    public void saveChatMessageToRoom(ResChatMessage message) {
        List<ResChatMessage> list = opsHashMessageList.get(RoomMessageList, message.getRoomUUID());
        if(list == null) {
            list = new ArrayList<>();
        }
        int redisMessageId = list.size() + 1;
        message.setRedis_message_id(redisMessageId);
        list.add(message);
        opsHashMessageList.put(RoomMessageList, message.getRoomUUID(), list);
    }


    public void updateSelectMessage(String roomUUID, String chatUUID) {
        List<ResChatMessage> list = opsHashMessageList.get(RoomMessageList, roomUUID);
        for(ResChatMessage resChatMessage : list) {
            if(resChatMessage.getUUID().equals(chatUUID)) {
                resChatMessage.getSelectMessageInfo().setSelected("T");
                break;
            }
        }
        opsHashMessageList.put(RoomMessageList, roomUUID, list);
    }
}
