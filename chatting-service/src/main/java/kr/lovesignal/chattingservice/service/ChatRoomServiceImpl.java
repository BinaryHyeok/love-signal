package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import kr.lovesignal.chattingservice.model.request.ReqChatRoom;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import kr.lovesignal.chattingservice.model.response.ResChatRoom;
import kr.lovesignal.chattingservice.model.response.ResEnterChatRoom;
import kr.lovesignal.chattingservice.model.response.ResSelectChatRoom;
import kr.lovesignal.chattingservice.pubsub.RedisSubscriber;
import kr.lovesignal.chattingservice.repository.*;
import kr.lovesignal.chattingservice.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.asm.Advice;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class ChatRoomServiceImpl implements ChatRoomService{

    // 채팅방(topic)에 발행되는 메시지를 처리할 Listner
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;

    private final CommonUtils commonUtils;
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ParticipantJpaRepository participantJpaRepository;


    /**
     * 채팅방 목록 불러오기
     */

    @Override
    public List<ResChatRoom> getChatRoomList(String userUUID) {
        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        List<ChatRoom> list = participantJpaRepository.findByMemberId(member.getMemberId());
        List<ResChatRoom> chatRoomList = new ArrayList<>();

        for(ChatRoom chatRoom : list) {
            ResChatRoom resChatRoom = ResChatRoom.toDto(chatRoom);
            String roomUUID = chatRoom.getUUID().toString();
            String lastMessage = chatRepository.bringLastChatMessage(roomUUID);
            resChatRoom.setLastChat(lastMessage);
            chatRoomList.add(resChatRoom);
        }

        return chatRoomList;
    }

    @Override
    public ResEnterChatRoom getChatRoom(String roomUUID) {
        UUID uuid = commonUtils.getValidUUID(roomUUID);
        ChatRoom chatRoom = chatRoomJpaRepository.findByUUID(uuid);
        ResEnterChatRoom resEnterChatRoom = ResEnterChatRoom.toDto(chatRoom);
        return resEnterChatRoom;
    }


    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */

    @Override
    public ChatRoom createSystemChatroom(String userUUID) {
        ChatRoom chatRoom = ChatRoom.builder()
                        .type("SYSTEM")
                        .roomName("러브시그널")
                        .build();

        chatRoomJpaRepository.save(chatRoom);

        List<ChatRoom> chatRooms = chatRoomJpaRepository.findAll();
        Long chatRoomId = chatRooms.get(chatRooms.size() - 1).getRoomId();

        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        Participant participant = Participant.builder()
                .memberId(member.getMemberId())
                .chatroomId(chatRoomId)
                .member(member) // 추가
                .chatRoom(chatRoom) // 추가
                .build();
        participantJpaRepository.save(participant);

        return chatRoom;
    }

    @Override
    public ChatRoom createSameGenderChatRoom(List<String> userUUIDs) {

        ChatRoom chatRoom = ChatRoom.builder()
                        .type("MEETING")
                        .roomName("두근두근 시그널 보내")
                        .build();
        chatRoomJpaRepository.save(chatRoom);

        List<ChatRoom> chatRooms = chatRoomJpaRepository.findAll();
        Long chatRoomId = chatRooms.get(chatRooms.size() - 1).getRoomId();

        for(String userUUID : userUUIDs) {
            UUID uuid = commonUtils.getValidUUID(userUUID);
            Member member = memberJpaRepository.findMemberByUUID(uuid);

            Participant participant  = Participant.builder()
                    .memberId(member.getMemberId())
                    .chatroomId(chatRoomId)
                    .member(member) // 추가
                    .chatRoom(chatRoom) // 추가
                    .build();
            participantJpaRepository.save(participant);
        }

        return chatRoom;
    }

    @Override
    public void createOneToOneChatRoom(String selectorUUID, String selectedUUID) {
        // selector , selected 각각 Member 객체 찾아오기.
        UUID uuid = commonUtils.getValidUUID(selectorUUID);
        UUID uuid2 = commonUtils.getValidUUID(selectedUUID);
        Member selector = memberJpaRepository.findMemberByUUID(uuid);
        Member selected = memberJpaRepository.findMemberByUUID(uuid2);

        // 현재 참여 중인 혼성 채팅방 찾기.
        List<ChatRoom> chatRooms = participantJpaRepository.findByMemberId(selector.getMemberId());
        ChatRoom meetingRoom = null;
        for(ChatRoom chatRoom : chatRooms) {
            if(chatRoom.getType().equals("MEETING")) {
                meetingRoom = chatRoom;
            }
        }
        String meetingRoomUUID = meetingRoom.getUUID().toString();

        // 만들어진 시간이 16시 전인지 후인지. 혼성 채팅방이 현재 몇 번째 밤인지.
        int nightNumber = Period.between(meetingRoom.getCreatedDate().toLocalDate(), LocalDate.now()).getDays();
        int createdHour = meetingRoom.getCreatedDate().getHour();

        // 혼성 채팅방이 16시 전에 생성됐을 때
        if(createdHour < 16) {
            // nightNumber 가 2 이면 마지막 선택 SIGNAL, nightNumber 가 0, 1 이면 익명 선택 SECRET
            String roomType = nightNumber==2?"SIGNAL":"SECRET";
            secretOneToOne(selectorUUID, selectedUUID, meetingRoomUUID, roomType, selector, selected);
        }
        // 혼성 채팅방이 16시 이후에 생성됐을 때
        else if(createdHour >= 16) {
            // nightNumber 가 3 이면 마지막 선택 SIGNAL, nightNumber 가 0,1,2 이면 익명 선택 SECRET
            String roomType = nightNumber==3?"SIGNAL":"SECRET";
            secretOneToOne(selectorUUID, selectedUUID, meetingRoomUUID, roomType, selector, selected);
        }


    }

    /**
     * createOneToOneChatRoom() 메서드에 사용되는 메서드
     * 1일, 2일 차 선택의 시간에 채팅방 생성
     */
    public void secretOneToOne(String selectorUUID, String selectedUUID, String meetingRoomUUID,
                               String type, Member selector, Member selected) {
        // 내가 지목한 상대가 나를 지목해서 이미 채팅방이 만들었는지 조회.
        ResSelectChatRoom checkSelectChatRoom =
                chatRoomRepository.checkResSelectChatRoom(selectorUUID, selectedUUID, meetingRoomUUID);

        // null 이 아니면 나를 지목한 것임. Love(양방향) 을 True 로 업데이트
        if(checkSelectChatRoom != null) {
            chatRoomRepository.updateResSelectChatRoom(meetingRoomUUID, checkSelectChatRoom.getUUID());
        }
        // null 이면 나만 지목한 것임. 신규 채팅방 생성.
        else {
            ResSelectChatRoom resSelectChatRoom = ResSelectChatRoom.builder()
                    .UUID(UUID.randomUUID().toString())
                    .type(type)
                    .roomName("")
                    .createdDate(LocalDateTime.now().toString())
                    .updatedDate(LocalDateTime.now().toString())
                    .expired("F")
                    .selector(selector)
                    .selected(selected)
                    .build();

            // redis 에 저장.
            chatRoomRepository.saveResSelectChatRoom(meetingRoomUUID, resSelectChatRoom);
        }
    }


    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */

    public void enterChatRoom(String roomUUID) {
        ChannelTopic topic = topics.get(roomUUID);
        if (topic == null)
            topic = new ChannelTopic(roomUUID);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomUUID, topic);
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }
}

