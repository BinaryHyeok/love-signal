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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

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

    @Scheduled(cron = "0 0 22 * * *") // 초 분 시 일 월 요일 - 매일밤 10시에 실행
    public void saveSelectMessage() {
        //모든 채팅방. type 이 Meeting 인 것. expired 가 F 인 것. List 로 불러오기
        List<ChatRoom> chatRooms = chatRoomJpaRepository.findByTypeAndExpired("MEETING", "F");

        for(ChatRoom chatRoom : chatRooms) {
            //list 의 채팅방 Period.between(createdDate, LocalDate.now()).getDays(); 로 날짜 계산.
            int nightNumber = Period.between(chatRoom.getCreatedDate().toLocalDate(), LocalDate.now()).getDays();

//            // 이성지목 메세지 객체 생성
//            UUID uuid = UUID.randomUUID();
//            String roomUUID = uuid.toString();
//
//            ReqChatMessage reqChatMessage = ReqChatMessage.builder()
//                    .redis_message_id(0)
//                    .redis_message_id(0)
//                    .roomUUID(roomUUID)
//                    .type("TALK") // IMAGE 로 바꿔야 함.
//                    .nickname("러브시그널")
//                    .content("테스트 내용") //
//                    .notReadPerson(0) // 이건 여기서도. 다른 곳에서도 프론트/백 단에서 어떻게 처리해야하냐?
//                    .UUID(UUID.randomUUID().toString())
//                    .createdDate(LocalDateTime.now().toString())
//                    .updatedDate(LocalDateTime.now().toString())
//                    .expired("F")
//                    .build();

            // 이성지목 메세지를 발송해야 하는 조건에서만 메세지 발송
            if(!(nightNumber == 0 && chatRoom.getCreatedDate().getHour() >= 16)) {
                // 해당 채팅룸에 입장한 사람 목록 불러오기.
                List<Participant> participants = chatRoom.getParticipants();
                List<Member> maleMembers = new ArrayList<>();
                List<Member> femaleMembers = new ArrayList<>();

                // 성별 별로 나눠서 저장.
                for(Participant participant : participants) {
                    Member member = participant.getMember();

                    if(member.getGender() == 'M') {
                        maleMembers.add(member);
                    }
                    else femaleMembers.add(member);
                }

                // 성별 별로 메세지 발송
                for(Member member : maleMembers) {

                }

            }
        }

    }

}
