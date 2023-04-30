package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.pubsub.RedisPublisher;
import kr.lovesignal.chattingservice.repository.ChatRepository;
import kr.lovesignal.chattingservice.repository.ChatRoomJpaRepository;
import kr.lovesignal.chattingservice.repository.MemberJpaRepository;
import kr.lovesignal.chattingservice.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRoomService chatRoomService;
    private final ChatRepository chatRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
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
        // 룸 uuid 랑 보낼 메세지 객체
        // uuid 로 토픽 객체 가져와야 함
        // 일단 JPA 연관관계 매핑 설정부터 똑바로.
    }
}
