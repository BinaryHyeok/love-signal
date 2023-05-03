package kr.lovesignal.chattingservice.repository;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import kr.lovesignal.chattingservice.model.response.ResSelectChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

    private final String SELECT = "Select";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, List<ResSelectChatRoom>> opsHashSelectRoomList;

    @PostConstruct
    public void init() {
        opsHashSelectRoomList = redisTemplate.opsForHash();
    }

    public ResSelectChatRoom getResSelectChatRoom(String selectorUUID, String selectedUUID, String meetingRoomUUID) {
        // 리턴 껍데기 생성
        ResSelectChatRoom chatRoom = null;

        // 같은 HK 로 MEETING 룸에서 만든 모든 1:1 채팅방 조회.
        List<ResSelectChatRoom> list = opsHashSelectRoomList.get(SELECT, meetingRoomUUID);

        // HV 순회하면서 selector 와 selected 반대로 일치하는 채팅방 존재유무 체크.
        for(ResSelectChatRoom resSelectChatRoom : list) {
            String preSelectorUUID = resSelectChatRoom.getSelected().getUUID().toString();
            String preSelectedUUID = resSelectChatRoom.getSelector().getUUID().toString();

            // 발견하면 리턴 껍데기에 주입.
            if(selectorUUID.equals(preSelectorUUID) && selectedUUID.equals(preSelectedUUID)) {
                chatRoom = resSelectChatRoom;
            }
        }
        return chatRoom;
    }

    public void saveResSelectChatRoom(String meetingRoomUUID, ResSelectChatRoom resSelectChatRoom) {
        List<ResSelectChatRoom> list = opsHashSelectRoomList.get(SELECT, meetingRoomUUID);
        list.add(resSelectChatRoom);
        opsHashSelectRoomList.put(SELECT, meetingRoomUUID, list);
    }

    public void updateResSelectChatRoom(String meetingRoomUUID, String resSelectChatRoomUUID) {
        List<ResSelectChatRoom> list = opsHashSelectRoomList.get(SELECT, meetingRoomUUID);
        for(ResSelectChatRoom findRoom : list) {
            if(findRoom.getUUID().equals(resSelectChatRoomUUID)) {
                findRoom.setLove("T");
            }
        }
        opsHashSelectRoomList.put(SELECT, meetingRoomUUID, list);
    }
}
