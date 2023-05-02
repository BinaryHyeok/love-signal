package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.*;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.model.request.SelectOrShareInfo;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import kr.lovesignal.chattingservice.pubsub.RedisPublisher;
import kr.lovesignal.chattingservice.repository.ChatRepository;
import kr.lovesignal.chattingservice.repository.ChatRoomJpaRepository;
import kr.lovesignal.chattingservice.repository.MemberJpaRepository;
import kr.lovesignal.chattingservice.repository.TeamJpaRepository;
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
import java.util.Map;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final TeamJpaRepository teamJpaRepository;
    private final CommonUtils commonUtils;


    /**
     * 메세지 저장
     */
    @Override
    public void saveChatMessage(ReqChatMessage reqChatMessage) {
        ResChatMessage resChatMessage = reqChatMessage.toResChatMessage();
        chatRepository.saveChatMessage(resChatMessage);
    }

    /**
     * 해당 채팅방에 모든 메세지 조회.
     */
    @Override
    public List<ResChatMessage> getChatMessages(String roomUUID) {
        return chatRepository.getChatMessages(roomUUID);
    }

    /**
     * 동성 채팅방에 이성팀 프로필 공유.
     */
    @Override
    public void saveShareMessage(String userUUID, String oppositeTeamUUID) {
        // 메세지를 공유하는 멤버
        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findMemberByUUID(uuid);

        // 이성팀 멤버 리스트 조회
        UUID teamUUID = commonUtils.getValidUUID(oppositeTeamUUID);
        Team team = teamJpaRepository.findByTeamUUID(teamUUID);
        List<Member> oppositeMembers = memberJpaRepository.findMemberByTeamId(team.getTeamId());

        // SelectOrShareInfo 객체 생성
        List<String> nicknames = new ArrayList<>();
        List<String> profileUrls = new ArrayList<>();

        for(Member oppositeMember : oppositeMembers) {
            nicknames.add(oppositeMember.getNickname());
//            profileUrls.add() 여기에 프로필 사진
        }

        // SelectOrShareInfo 객체 생성
        SelectOrShareInfo selectOrShareInfo = SelectOrShareInfo.builder()
                .nicknames(nicknames) // 여기에 이성 멤버들 이름
                .profileUrls(profileUrls) // 여기에 이성 멤버들 사진
                .build();

        // 룸 uuid
        UUID roomUUID = UUID.randomUUID();
        List<Participant> participants = member.getParticipants();

        // member 가 참여하고 있는 모든 채팅방 순회
        for(Participant participant : participants) {
            ChatRoom findRoom = participant.getChatRoom();
            // 동성팀 채팅방 발견하면 동성 채팅방의 UUID 뽑아내기.
            if(findRoom.getType().equals("TEAM") && findRoom.getExpired().equals("F"))
                roomUUID = findRoom.getUUID();
        }
        // 동성 채팅방의 UUID 를 스트링으로 변환.
        String topicId = roomUUID.toString();

        // 보낼 메세지 객체
        ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                .roomUUID(topicId)
                .type("SHARE") //
                .nickname(member.getNickname())
                .content("")
                .selectOrShareInfo(selectOrShareInfo)
                .build();

        // chat save 메서드 실행
        saveChatMessage(reqChatMessage);

    }

    /**
     * 이성 지목 완료 업데이트.
     */
    @Override
    public void updateSelectMessage(String roomUUID, String chatUUID) {
        chatRepository.updateSelectMessage(roomUUID, chatUUID);
    }

    /**
     * 선택의 시간에 때 시스템 채팅방에 이성 지목 메세지 저장.
     */
    @Scheduled(cron = "0 0 22 * * *") // 초 분 시 일 월 요일 - 매일밤 10시에 실행
    public void saveSelectMessage() {
        //모든 채팅방. type 이 Meeting 인 것. expired 가 F 인 것. List 로 불러오기
        List<ChatRoom> chatRooms = chatRoomJpaRepository.findByTypeAndExpired("MEETING", "F");

        for(ChatRoom chatRoom : chatRooms) {
            //list 의 채팅방 Period.between(createdDate, LocalDate.now()).getDays(); 로 날짜 계산.
            int nightNumber = Period.between(chatRoom.getCreatedDate().toLocalDate(), LocalDate.now()).getDays();

            // 이성지목 메세지를 발송해야 하는 조건에서만 메세지 발송
            if(!(nightNumber == 0 && chatRoom.getCreatedDate().getHour() >= 16)) {
                // 해당 채팅룸에 입장한 사람 목록 불러오기.
                List<Participant> participants = chatRoom.getParticipants();

                // 성별 별로 리스트 생성
                List<Member> members = new ArrayList<>();
                List<String> maleNicknames = new ArrayList<>();
                List<String> maleProfileUrls = new ArrayList<>();
                List<String> femaleNicknames = new ArrayList<>();
                List<String> femaleProfileUrls = new ArrayList<>();

                /*
                    멤버 리스트에 멤버 저장.
                    성별 별로 리스트에 내용물 저장.
                 */
                for(Participant participant : participants) {
                    Member member = participant.getMember();
                    members.add(member);

                    if(member.getGender() == 'M') {
                        maleNicknames.add(member.getNickname());
//                        maleProfileUrls.add() 여기에는 url 주소
                    }
                    else {
                        femaleNicknames.add(member.getNickname());
//                        femaleProfileUrls.add() 여기에는 url 주소
                    }
                }

                // 이성지목 메세지 객체 생성
                ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                        .type("SELECT") //
                        .nickname("러브시그널")
                        .content("")
                        .build();

                // 혼성 채팅방에 있는 모든 멤버를 순회하면서 각 멤버의 모든 채팅방 정보를 조회.
                for(Member member : members) {
                    List<Participant> memberParticipants = member.getParticipants();

                    // Member 가 참여하고 있는 모든 채팅방을 순회하면서 SYSTEM 채팅방 조회
                    findSystemChatRoomFor:
                    for(Participant participant : memberParticipants) {
                        ChatRoom findSystemChatRoom = participant.getChatRoom();
                        if(findSystemChatRoom.getType().equals("SYSTEM")){
                            // ReqChatMessage 에 roomUUID 주입.
                            reqChatMessage.setRoomUUID(findSystemChatRoom.getUUID().toString());

                            // 닉네임과 사진이 있는 SelectOrShareInfo 객체 생성후 Req 메세지에 주입.
                            if(member.getGender() == 'M') {
                                setSelctInfo(femaleNicknames, femaleProfileUrls, reqChatMessage);
                            }
                            else {
                                setSelctInfo(maleNicknames, maleProfileUrls, reqChatMessage);
                            }

                            // 실질적으로 Redis 에 메세지 객체 저장
                            saveChatMessage(reqChatMessage);
                            break findSystemChatRoomFor;
                        }
                    }
                }

            }
        }
    }

    /**
     * saveSelectMessage() 에 사용되는 메서드
     * ReqChatMessage 에 SelectOrShareInfo 객체를 생성하여 주입.
     */
    private void setSelctInfo(List<String> nicknames, List<String> profileUrls, ReqChatMessage reqChatMessage) {
        SelectOrShareInfo selectOrShareInfo = SelectOrShareInfo.builder()
                .nicknames(nicknames)
                .profileUrls(profileUrls)
                .build();
        reqChatMessage.setSelectOrShareInfo(selectOrShareInfo);
    }

}
