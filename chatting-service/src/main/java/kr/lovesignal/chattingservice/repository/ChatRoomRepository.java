package kr.lovesignal.chattingservice.repository;
import kr.lovesignal.chattingservice.entity.Participant;
import kr.lovesignal.chattingservice.model.response.ResChatRoom;
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
    private HashOperations<String, String, List<ResChatRoom>> opsHashSelectRoomList;
    private HashOperations<String, String, List<Participant>> opsHashParticipantList;

    @PostConstruct
    public void init() {
        opsHashSelectRoomList = redisTemplate.opsForHash();
        opsHashParticipantList = redisTemplate.opsForHash();
    }

    public ResChatRoom checkResSelectChatRoom(String selectorUUID, String selectedUUID, String meetingRoomUUID) {
        // 리턴 껍데기 생성
        ResChatRoom chatRoom = null;

        // 같은 HK 로 MEETING 룸에서 만든 모든 1:1 채팅방 조회.
        List<ResChatRoom> list = opsHashSelectRoomList.get(SELECT, "1");

        if(list == null)
            return chatRoom;

        // HV 순회하면서 selector 와 selected 반대로 일치하는 채팅방 존재유무 체크.
        for(ResChatRoom resSelectChatRoom : list) {
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

    public void saveResSelectChatRoom(String meetingRoomUUID, ResChatRoom resSelectChatRoom) {
        List<ResChatRoom> list = opsHashSelectRoomList.get(SELECT, "1");
        if(list == null) {
            list = new ArrayList<>();
        }
        list.add(resSelectChatRoom);
        opsHashSelectRoomList.put(SELECT, "1", list);
    }

    public void updateResSelectChatRoom(String meetingRoomUUID, String resSelectChatRoomUUID) {
        List<ResChatRoom> list = opsHashSelectRoomList.get(SELECT, "1");
        for(ResChatRoom findRoom : list) {
            if(findRoom.getUUID().equals(resSelectChatRoomUUID)) {
                findRoom.setLove("T");
            }
        }
        opsHashSelectRoomList.put(SELECT, "1", list);
    }

    public List<ResChatRoom> getSelectRoomList() {
        List<ResChatRoom> resChatRooms = opsHashSelectRoomList.get(SELECT, "1");
        if(resChatRooms == null) {
            resChatRooms = new ArrayList<>();
        }
        return resChatRooms;
    }

    public List<Participant> getParticipantList() {
        return opsHashParticipantList.get(PARTICIPANT, "1");
    }


    public void expiredSecretChatRoom() {
        List<ResChatRoom> list = opsHashSelectRoomList.get(SELECT, "1");
        for(ResChatRoom resChatRoom : list) {
            resChatRoom.setExpired("T");
        }
        opsHashSelectRoomList.put(SELECT, "1", list);
    }
}
