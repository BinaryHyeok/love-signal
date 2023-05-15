package kr.lovesignal.chattingservice.repository;
import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import kr.lovesignal.chattingservice.model.response.ResSelectChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ChatRoomRepository {

    private final String SELECT = "Select";
    private final String PARTICIPANT = "Participant";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, List<ResSelectChatRoom>> opsHashSelectRoomList;
    private HashOperations<String, String, List<Participant>> opsHashParticipantList;

    @PostConstruct
    public void init() {
        opsHashSelectRoomList = redisTemplate.opsForHash();
        opsHashParticipantList = redisTemplate.opsForHash();
    }

    public ResSelectChatRoom checkResSelectChatRoom(String selectorUUID, String selectedUUID, String meetingRoomUUID) {
        // 리턴 껍데기 생성
        ResSelectChatRoom chatRoom = null;

        // 같은 HK 로 MEETING 룸에서 만든 모든 1:1 채팅방 조회.
        List<ResSelectChatRoom> list = opsHashSelectRoomList.get(SELECT, meetingRoomUUID);

        if(list == null)
            return chatRoom;

        // HV 순회하면서 selector 와 selected 반대로 일치하는 채팅방 존재유무 체크.
        for(ResSelectChatRoom resSelectChatRoom : list) {
            String preSelectorUUID = resSelectChatRoom.getSelected().getMemberUUID().toString();
            String preSelectedUUID = resSelectChatRoom.getSelector().getMemberUUID().toString();

            // 발견하면 리턴 껍데기에 주입.
            if(selectorUUID.equals(preSelectorUUID) && selectedUUID.equals(preSelectedUUID)) {
                chatRoom = resSelectChatRoom;
            }
        }
        return chatRoom;
    }

    public void saveParticipant(Participant selector, Participant selected) {
        List<Participant> list  = opsHashParticipantList.get(PARTICIPANT, "1");
        if(list == null) {
            list = new ArrayList<>();
        }
        list.add(selector);
        list.add(selected);
        opsHashParticipantList.put(PARTICIPANT, "1", list);
    }

    public void saveResSelectChatRoom(String meetingRoomUUID, ResSelectChatRoom resSelectChatRoom) {
        List<ResSelectChatRoom> list = opsHashSelectRoomList.get(SELECT, meetingRoomUUID);
        if(list == null) {
            list = new ArrayList<>();
        }
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

    public List<List<ResSelectChatRoom>> getHkeyValues() {
        return opsHashSelectRoomList.values(SELECT);
    }

    public List<Participant> getParticipantList() {
        return opsHashParticipantList.get(PARTICIPANT, "1");
    }


}
