package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.pubsub.RedisPublisher;
import kr.lovesignal.chattingservice.repository.ChatRepository;
import kr.lovesignal.chattingservice.repository.ChatRoomJpaRepository;
import kr.lovesignal.chattingservice.repository.MemberJpaRepository;
import kr.lovesignal.chattingservice.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final CommonUtils commonUtils;


    @Override
    public void saveChatMessage(ReqChatMessage message) {
        chatRepository.saveChatMessage(message);
    }

    @Override
    public List<ReqChatMessage> getChatMessages(String roomUUID) {
        return chatRepository.getChatMessages(roomUUID);
    }

    @Override
    public void saveShareMessage(String userUUID, String oppositeTeamUUID) {
        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        // 룸 uuid
        UUID roomUUID = UUID.randomUUID();
        List<Participant> participants = member.getParticipants();
        for(Participant participant : participants) {
            ChatRoom findRoom = participant.getChatRoom();
            if(findRoom.getType().equals("TEAM") && findRoom.getExpired().equals("F"))
                roomUUID = findRoom.getUUID();
        }
        String topicId = roomUUID.toString();

        // 보낼 메세지 객체
        ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                .redis_message_id(0)
                .roomUUID(topicId)
                .type("TALK") // IMAGE 로 바꿔야 함.
                .nickname(member.getNickname())
                .content("테스트 내용")
                .notReadPerson(0) // 이건 여기서도. 다른 곳에서도 프론트/백 단에서 어떻게 처리해야하냐?
                .UUID(UUID.randomUUID().toString())
                .createdDate(LocalDateTime.now().toString())
                .updatedDate(LocalDateTime.now().toString())
                .expired("F")
                .build();

        // chat save 메서드 실행
        saveChatMessage(reqChatMessage);

    }
}
