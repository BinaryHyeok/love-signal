package kr.lovesignal.chattingservice.service;

import io.swagger.v3.oas.annotations.enums.ParameterIn;
import kr.lovesignal.chattingservice.entity.*;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.model.response.*;
import kr.lovesignal.chattingservice.pubsub.RedisSubscriber;
import kr.lovesignal.chattingservice.repository.*;
import kr.lovesignal.chattingservice.util.CommonUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatRoomJpaRepository chatRoomJpaRepository;
    private final MemberJpaRepository memberJpaRepository;
    private final ParticipantJpaRepository participantJpaRepository;
    private final ProfileImageJpaRepository profileImageJpaRepository;

    private final WebClient webClient;
    private final DiscoveryClient discoveryClient;

    @Value("${server.port}")
    private int port;



    @PostConstruct
    private void init() {
        topics = new HashMap<>();
    }


    public Participant buildParticipant(Member member, ChatRoom chatRoom) {
        return Participant.builder()
                .member(member)
                .chatRoom(chatRoom)
                .build();
    }

    public String getProfileImageStoredName(Member member) {
        ProfileImage profileImage = profileImageJpaRepository.findByMemberAndExpired(member, "F");
        if(profileImage == null)
            return "https://love-signal.s3.ap-northeast-2.amazonaws.com/default-blob";
        return profileImage.getStoredName();
    }


    /**
     * 채팅방 목록 불러오기
     */

    @Override
    public List<ResChatRoom> getChatRoomList(String userUUID) {
        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findByUUID(uuid);

        // return 을 위한 껍데기
        List<ResChatRoom> chatRoomList = new ArrayList<>();
        // 멤버가 참여하고 있는 Participant 정보들
        List<Participant> memberParticipants = member.getParticipants();

        // 멤버가 참여하고 있는 모든 Participant 순회
        for(Participant participant : memberParticipants) {
            List<ResMember> memberList = new ArrayList<>();

            if(participant.getExpired().equals("F")) {

                // Redis 에 있는 select, selected 정보를 주입하기 위한 Redis 의 select 채팅방들
                List<ResChatRoom> selectRoomList = chatRoomRepository.getSelectRoomList();

                // Participant 객체에서 ChatRoom 을 뽑아오고 ResChatRoom 으로 변환.
                ChatRoom chatRoom = participant.getChatRoom();
    //            if(!(chatRoom.getType().equals("SECRET") || chatRoom.getType().equals("SIGNAL"))) {
                    ResChatRoom resChatRoom = ResChatRoom.toDto(chatRoom);

                    // Redis 에 있던 One To One 채팅방의 소실된 정보 다시 주입.
                    for(ResChatRoom resSelectChatRoom : selectRoomList) {
                        if(resChatRoom.getUUID().equals(resSelectChatRoom.getUUID())) {
                            resChatRoom.setSelector(resSelectChatRoom.getSelector());
                            resChatRoom.setSelected(resSelectChatRoom.getSelected());
                            resChatRoom.setLove(resChatRoom.getLove());
                            System.out.println("getSelector======================"+resSelectChatRoom.getSelector());
                            System.out.println("getSelected======================"+resSelectChatRoom.getSelected());
                            System.out.println("getLove======================"+resSelectChatRoom.getLove());
                        }
                    }

                    // 룸에 참여하고 있는 모든 Participant 순회
                    List<Participant> roomParticipants = participantJpaRepository.findByChatRoom(chatRoom);
                    for(Participant participant1 : roomParticipants) {
                        if(participant1.getExpired().equals("F")) {
                            // 멤버를 뽑아서 반환 멤버 생성
                            Member member1 = participant1.getMember();
                            ResMember resMember = ResMember.toDto(member1);
                            resMember.setProfileImage(getProfileImageStoredName(member1));
                            // 멤버 나이 계산 및 주입
                            LocalDate birthDate = LocalDate.parse(member1.getBirth(), DateTimeFormatter.BASIC_ISO_DATE);
                            int age = Period.between(birthDate, LocalDate.now()).getYears();
                            resMember.setAge(age);
                            memberList.add(resMember);
                        }
                    }

                    // 알맹이 리스트를 ResChatRoom 객체에 주입
                    resChatRoom.setMemberList(memberList);
                    if(participant.getExpired().equals("F"))
                        chatRoomList.add(resChatRoom);
    //            }
            }
        }

////        이 코드 문제있음. Redis 에서 직접 가져오는 거라 DB에서 만료처리 된 녀석들도 가져옴.
//        List<ResChatRoom> resChatRooms = chatRoomRepository.getSelectRoomList();
//        if(resChatRooms != null) {
//            for(ResChatRoom resChatRoom : resChatRooms) {
//                if(resChatRoom.getExpired().equals("F")){
//                    String selectorUUID = resChatRoom.getSelector().getMemberUUID();
//                    String selectedUUID = resChatRoom.getSelected().getMemberUUID();
//                    if(selectorUUID.equals(userUUID) || selectedUUID.equals(userUUID)) {
//                        chatRoomList.add(resChatRoom);
//                    }
//                }
//            }
//        }

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
     * 채팅방 나가기
     */
    @Override
    public void exitChatRoom(List<String> strMemberUUIDs) {
        for(String strMemberUUID : strMemberUUIDs) {
            UUID memberUUID = commonUtils.getValidUUID(strMemberUUID);
            Member member = memberJpaRepository.findByUUID(memberUUID);

            List<Participant> participants = member.getParticipants();
            for(Participant participant : participants) {
                ChatRoom chatRoom = participant.getChatRoom();

                // 나혼자 팀을 나갔을 때
                if(chatRoom.getType().equals("TEAM")) {
                    participant.setExpired("T");
                    chatRoom.setExpired("T");
                }

                // 팀이나 미팅이 터졌을 때
                if(strMemberUUIDs.size() >=2 && !chatRoom.getType().equals("SYSTEM") ) {
                    participant.setExpired("T");
                    chatRoom.setExpired("T");
                }

                chatRoomJpaRepository.save(chatRoom);

                if(chatRoom.getType().equals("TEAM") || chatRoom.getType().equals("MEETING")) {
                    participant.setExpired("T");
                    participantJpaRepository.save(participant);

                    ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                            .roomUUID(chatRoom.getUUID().toString())
                            .type("EXIT")
                            .nickname(member.getNickname())
                            .content(member.getNickname()+"님이 퇴장했습니다.")
                            .build();

                    chatService.saveChatMessage(reqChatMessage);
                }
            }
        }
    }

    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */

    @Override
    public ChatRoom createSystemChatroom(String userUUID) {
        ChatRoom room = ChatRoom.builder()
                        .type("SYSTEM")
                        .roomName("러브시그널")
                        .build();

        ChatRoom chatRoom = chatRoomJpaRepository.save(room);

        UUID uuid = commonUtils.getValidUUID(userUUID);
        Member member = memberJpaRepository.findByUUID(uuid);

        ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                .roomUUID(chatRoom.getUUID().toString())
                .type("ENTER")
                .nickname(member.getNickname())
                .content(member.getNickname()+"님이 입장했습니다.")
                .build();

        chatService.saveChatMessage(reqChatMessage);

        Participant participant = Participant.builder()
                .member(member) // 추가
                .chatRoom(chatRoom) // 추가
                .build();
        participantJpaRepository.save(participant);

        return chatRoom;
    }

    @Override
    public ChatRoom createSameOrAllGenderChatRoom(List<String> userUUIDs) {

        // 채팅방 생성하기.
        String type = userUUIDs.size()==3? "TEAM":"MEETING";
        String roomName = type.equals("TEAM")?"애인 없는 사람들 모임 ㅋ":"두근두근 시그널 보내고 짝 찾기 ㅋ";

        ChatRoom room = ChatRoom.builder()
                        .type(type)
                        .roomName(roomName)
                        .build();
        ChatRoom chatRoom = chatRoomJpaRepository.save(room);

        // 채팅방에 멤버 참여시키기, 입장 메세지 저장.
        for(String userUUID : userUUIDs) {
            UUID uuid = commonUtils.getValidUUID(userUUID);
            Member member = memberJpaRepository.findByUUID(uuid);

            Participant participant  = Participant.builder()
                    .member(member) // 추가
                    .chatRoom(chatRoom) // 추가
                    .build();
            participantJpaRepository.save(participant);

            ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                    .roomUUID(chatRoom.getUUID().toString())
                    .type("ENTER")
                    .nickname(member.getNickname())
                    .content(member.getNickname()+"님이 입장했습니다.")
                    .build();

            chatService.saveChatMessage(reqChatMessage);
        }

        return chatRoom;
    }


    //    @Override
//    public void createOneToOneChatRoom(String selectorUUID, String selectedNickname) {
//        // selector , selected 각각 Member 객체 찾아오기.
//
//        UUID uuid = commonUtils.getValidUUID(selectorUUID);
//        Member selector = memberJpaRepository.findByUUID(uuid);
//        Member selected = memberJpaRepository.findMemberByNickname(selectedNickname);
//        UUID uuid2 = selected.getUUID();
//        String selectedUUID = uuid2.toString();
//
//        // 현재 참여 중인 혼성 채팅방 찾기.
//        List<Participant> participants = selector.getParticipants();
//        ChatRoom meetingRoom = null;
//        for(Participant participant : participants) {
//            if(participant.getChatRoom().getType().equals("MEETING")) {
//                meetingRoom = participant.getChatRoom();
//            }
//        }
//        String meetingRoomUUID = meetingRoom.getUUID().toString();
//        System.out.println("235 chatRoom Service Impl ======================"+meetingRoomUUID);
//
//        // 만들어진 시간이 16시 전인지 후인지. 혼성 채팅방이 현재 몇 번째 밤인지.
//        int nightNumber = Period.between(meetingRoom.getCreatedDate().toLocalDate(), LocalDate.now()).getDays();
//        int createdHour = meetingRoom.getCreatedDate().getHour();
//
//        // 혼성 채팅방이 16시 전에 생성됐을 때
////        if(createdHour < 16) { 일단은 조건 분기 다 빼놓기. 테스트를 위함.
//            // nightNumber 가 2 이면 마지막 선택 SIGNAL, nightNumber 가 0, 1 이면 익명 선택 SECRET
//            String roomType = nightNumber==2?"SIGNAL":"SECRET";
//            secretOneToOne(selectorUUID, selectedUUID, meetingRoomUUID, roomType, selector, selected);
////        }
////        // 혼성 채팅방이 16시 이후에 생성됐을 때
////        else if(createdHour >= 16) {
////            // nightNumber 가 3 이면 마지막 선택 SIGNAL, nightNumber 가 0,1,2 이면 익명 선택 SECRET
////            String roomType = nightNumber==3?"SIGNAL":"SECRET";
////            secretOneToOne(selectorUUID, selectedUUID, meetingRoomUUID, roomType, selector, selected);
////        }
//    }


    @Override
    public void createOneToOneChatRoom(String selectorUUID, String selectedNickname) { // 발표용
        // selector , selected 각각 Member 객체 찾아오기.
        System.out.println("===========================일단 이거 클릭해서 들어옴==============================");

        UUID uuid = commonUtils.getValidUUID(selectorUUID);
        Member selector = memberJpaRepository.findByUUID(uuid);
        Member selected = memberJpaRepository.findMemberByNickname(selectedNickname);
        UUID uuid2 = selected.getUUID();
        String selectedUUID = uuid2.toString();

        // 현재 참여 중인 혼성 채팅방 찾기.
        List<Participant> participants = selector.getParticipants();
        ChatRoom meetingRoom = null;
        for(Participant participant : participants) {
            if(participant.getChatRoom().getType().equals("MEETING")) {
                meetingRoom = participant.getChatRoom();
                System.out.println("===============================미팅룸 찾음=============================");
            }
        }

        String meetingRoomUUID = meetingRoom.getUUID().toString();

        // 혼성 채팅방이 몇번째 선택의 시간인지.
        int selectCount = meetingRoom.getSelectCount();

        // 2번째면 시그널 아니면 익명
        String roomType = selectCount==2?"SIGNAL":"SECRET";
        secretOneToOne(selectorUUID, selectedUUID, meetingRoomUUID, roomType, selector, selected);
    }


    /**
     * createOneToOneChatRoom() 메서드에 사용되는 메서드
     * 1일, 2일 차 선택의 시간에 채팅방 생성
     */
    public void secretOneToOne(String selectorUUID, String selectedUUID, String meetingRoomUUID,
                               String type, Member selector, Member selected) {

        System.out.println("================== 실질적으로 Redis 채팅방 생성하는 로직 들어옴 ==================");

        ResMember selectorDto = ResMember.toDto(selector);
        ResMember selectedDto = ResMember.toDto(selected);

        String animalName = commonUtils.getAnimal();
        String roomName = type.equals("SECRET")?"익명의 "+animalName:"시그널 채팅방";

        // 내가 지목한 상대가 나를 지목해서 이미 채팅방을 만들었는지 조회.
        ResChatRoom checkSelectChatRoom =
                chatRoomRepository.checkResSelectChatRoom(selectorUUID, selectedUUID, meetingRoomUUID);

        // null 이 아니면 나를 지목한 것임. Love(양방향) 을 True 로 업데이트
        if(checkSelectChatRoom != null) {
            chatRoomRepository.updateResSelectChatRoom(meetingRoomUUID, checkSelectChatRoom.getUUID());
        }
        // null 이면 나만 지목한 것임. 신규 채팅방 생성.
        else {
            String roomUUID = UUID.randomUUID().toString();

            ResChatRoom resSelectChatRoom = ResChatRoom.builder()
                    .UUID(roomUUID)
                    .type(type)
                    .roomName(roomName)
                    .createdDate(LocalDateTime.now().toString())
                    .updatedDate(LocalDateTime.now().toString())
                    .expired("F")
                    .selector(selectorDto)
                    .selected(selectedDto)
                    .build();

            System.out.println("=======================Redis 채팅방 생성 Room Name====================" + resSelectChatRoom.getRoomName());
            System.out.println("=======================Redis 채팅방에 넣을 UUID ===================" + roomUUID);
            System.out.println("=======================Redis 채팅방 생성 Room get UUID===================" + resSelectChatRoom.getUUID());

            // redis 에 저장.
            chatRoomRepository.saveResSelectChatRoom(meetingRoomUUID, resSelectChatRoom);


            // 입장 메세지 저장.
            ReqChatMessage reqChatMessage = ReqChatMessage.builder()
                    .roomUUID(roomUUID)
                    .type("ENTER")
                    .nickname(animalName)
                    .content("익명 채팅방에 입장했습니다.")
                    .build();

            chatService.saveChatMessage(reqChatMessage);
        }
    }

    public List<ResChatRoom> getOneToOneResChatRoom(List<List<ResChatRoom>> hKeyValues) {
        List<ResChatRoom> list = new ArrayList<>();

        for (List<ResChatRoom> resSelectChatRoomList : hKeyValues) {
            for (ResChatRoom resChatRoom : resSelectChatRoomList) {
                list.add(resChatRoom);
            }
        }


        return null;
    }

    /**
     *  매일밤 10시 30분 선택의 시간에 의해 생성된 채팅방 저장.
     */
    @Scheduled(cron = "0 1/3 * * * *")
    @Override
    public void redisToMysql() {

        List<String> secretRoomMemberUUIDs = new ArrayList<>();
        List<String> signalRoomMemberUUIDs = new ArrayList<>();

        List<ResChatRoom> resChatRooms = chatRoomRepository.getSelectRoomList();
        if(resChatRooms != null) {

            for (ResChatRoom resChatRoom : resChatRooms) {

                ChatRoom chatRoom = resChatRoom.toEntity();
                UUID uuid = UUID.fromString(resChatRoom.getUUID());

                System.out.println("=========================ResChatRoom=================="+resChatRoom.getUUID());
                System.out.println("=========================Before ChatRoom=================="+chatRoom.getUUID().toString());

                chatRoom.setUUID(uuid);
                System.out.println("=========================After ChatRoom=================="+chatRoom.getUUID().toString());
                chatRoom.setUpdatedDate(LocalDateTime.now());

                ResMember selector = resChatRoom.getSelector();
                ResMember selected = resChatRoom.getSelected();

                Member selectorMember = memberJpaRepository.findMemberByNickname(selector.getNickname());
                Member selectedMember = memberJpaRepository.findMemberByNickname(selected.getNickname());

                Participant selectorParticipant = buildParticipant(selectorMember, chatRoom);
                Participant selectedParticipant = buildParticipant(selectedMember, chatRoom);

                if(chatRoom.getExpired().equals("F")) {
                    // 익명 선택의 시간이면 양방향 여부 상관없이 채팅방 엔티티 저장
                    if (resChatRoom.getType().equals("SECRET")) {
                        chatRoomJpaRepository.save(chatRoom);
                        participantJpaRepository.save(selectorParticipant);
                        participantJpaRepository.save(selectedParticipant);
                        secretRoomMemberUUIDs.add(selectorMember.getUUID().toString());
                        secretRoomMemberUUIDs.add(selectedMember.getUUID().toString());
                    }
                    // 마지막 선택의 시간이면 양방향 인것만 채팅방 엔티티 저장
                    else if (resChatRoom.getType().equals("SIGNAL") && resChatRoom.getLove().equals("T")) {
                        chatRoomJpaRepository.save(chatRoom);
                        participantJpaRepository.save(selectorParticipant);
                        participantJpaRepository.save(selectedParticipant);
                        signalRoomMemberUUIDs.add(selectorMember.getUUID().toString());
                        signalRoomMemberUUIDs.add(selectedMember.getUUID().toString());
                    }
                 }
            }
        }
        else {
            System.out.println("========================= Redis to Mysql null =====================================");
        }
        sendSecretFcmAlarm(secretRoomMemberUUIDs);
        sendSignalFcmAlarm(signalRoomMemberUUIDs);
    }

//        List<Participant> getParticipantList = chatRoomRepository.getParticipantList();
//        for(Participant participant : getParticipantList) {
//            chatRoomJpaRepository.save(participant.getChatRoom());
//            participantJpaRepository.save(participant);
//        }
//    }

    /**
     * 매일밤 11시 30분 1:1 채팅방 기간만료 처리.
     * Redis 안의 ResChatRoom 객체 기간만료 처리.
     * 채팅방에 연결된 Participant 연관객체도 기간만료 처리
     */
    @Scheduled(cron = "0 2/3 * * * *")
    @Override
    public void secretChatRoomExpiredT() {
        chatRoomRepository.expiredSecretChatRoom();
        List<ChatRoom> list = chatRoomJpaRepository.findByTypeAndExpired("SECRET", "F");
        for(ChatRoom secretChatRoom : list) {
            secretChatRoom.setExpired("T");
            chatRoomJpaRepository.save(secretChatRoom);
            List<Participant> participants = secretChatRoom.getParticipants();

            for(Participant participant : participants) {
                participant.setExpired("T");
                participantJpaRepository.save(participant);
            }
        }


    }

//    /**
//     * 동성혼성 채팅방 기간 만료
//     */
//    @Scheduled(cron = "0 24 18 * * *")
//    public void chatRoomExpired() {
//        List<ChatRoom> chatRooms = chatRoomJpaRepository.findByTypeAndExpired("MEETING", "F");
//        for(ChatRoom meetingRoom : chatRooms) {
//            int createdHour = meetingRoom.getCreatedDate().getHour();
//            int nightNumber = Period.between(meetingRoom.getCreatedDate().toLocalDate(), LocalDate.now()).getDays();
//
////            if((createdHour < 16 && nightNumber == 2) || (createdHour >= 16 && nightNumber == 3)) { 일단 조건 분기 빼
//                meetingRoom.setExpired("T");
//                chatRoomJpaRepository.save(meetingRoom);
//                List<Participant> participants = meetingRoom.getParticipants();
//
//                List<String> memberUUIDs = new ArrayList<>();
//                for(Participant participant : participants) {
//                    memberUUIDs.add(participant.getMember().getUUID().toString());
//                }
//
//                // 이 자리에 진혁이 API 호출
//                sendMeetingMemberUUIDs(memberUUIDs);
//
//                for(Participant participant : participants) {
//                    participant.setExpired("T");
//                    participantJpaRepository.save(participant);
//
//                    List<Participant> memberParticipants = participant.getMember().getParticipants();
//                    for(Participant memeberParticipant : memberParticipants) {
//                        ChatRoom chatRoom = memeberParticipant.getChatRoom();
//                        if(chatRoom.getType().equals("TEAM")) {
//                            chatRoom.setExpired("T");
//                        }
//                    }
//                }
////            }
//        }
//    }


    /**
     * 동성혼성 채팅방 기간 만료
     */
    @Scheduled(cron = "0/5 * * * * *")
    public void chatRoomExpired() {
        List<ChatRoom> meetingRooms = chatRoomJpaRepository.findByTypeAndExpired("MEETING", "F");
        for(ChatRoom meetingRoom : meetingRooms) {

            if(meetingRoom.getSelectCount()>=3) {
                // 미팅룸 만료 처리.
                meetingRoom.setExpired("T");
                chatRoomJpaRepository.save(meetingRoom);
                List<Participant> roomParticipants = meetingRoom.getParticipants();

                List<String> memberUUIDs = new ArrayList<>();
                for(Participant participant : roomParticipants) {
                    memberUUIDs.add(participant.getMember().getUUID().toString());
                }

                // 이 자리에 진혁이 API 호출
                sendMeetingMemberUUIDs(memberUUIDs);

                // 각 유저마다 미팅룸 만료 처리.
                for(Participant participant : roomParticipants) {
                    participant.setExpired("T");
                    participantJpaRepository.save(participant);
                }

                for(String memberUUID : memberUUIDs) {
                    UUID UUID = commonUtils.getValidUUID(memberUUID);
                    Member member = memberJpaRepository.findByUUID(UUID);

                    List<Participant> participants = member.getParticipants();
                    for(Participant participant : participants) {
                        ChatRoom chatRoom = participant.getChatRoom();
                        if(chatRoom.getType().equals("TEAM")) {
                            long roomId = participant.getChatRoom().getRoomId();
                            Optional<ChatRoom> roomOptional = chatRoomJpaRepository.findById(roomId);
                            if(roomOptional.isPresent()) {
                                ChatRoom teamChatRoom = roomOptional.get();
                                teamChatRoom.setExpired("T");
                                chatRoomJpaRepository.save(teamChatRoom);

                                participant.setExpired("T");
                                participantJpaRepository.save(participant);
                            }
                        }
                    }
                }
            }
        }
    }


    /**
     * 진혁이한테 보낼 API
     */
    public void sendMeetingMemberUUIDs(List<String> memberUUIDs) {
        String uri = "http://localhost:9005/api/team/expire-meeting";

        List<ServiceInstance> instances = discoveryClient.getInstances("team-service");
        if(instances == null || instances.isEmpty()){
            System.out.println("에러남.");
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/api/team/expire-meeting";
        }

        webClient.put()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    /**
     * 익명채팅방 fcm알람
     */
    public void sendSecretFcmAlarm(List<String> memberUUIDs) {
        String uri = "http://localhost:4444/api/fcm/secret/notification";

        List<ServiceInstance> instances = discoveryClient.getInstances("fcm-service");
        if(instances == null || instances.isEmpty()){
            System.out.println("에러남.");
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/api/fcm/secret/notification";
        }

        webClient.post()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }

    /**
     * 시그널채팅방 fcm알람
     */
    public void sendSignalFcmAlarm(List<String> memberUUIDs) {
        String uri = "http://localhost:4444/api/fcm/signal/notification";

        List<ServiceInstance> instances = discoveryClient.getInstances("fcm-service");
        if(instances == null || instances.isEmpty()){
            System.out.println("에러남.");
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/api/fcm/signal/notification";
        }

        webClient.post()
                .uri(uri)
                .bodyValue(memberUUIDs)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }


    /**
     * 채팅방 입장 (웹소켓 연결) : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */

    public void enterChatRoom(String roomUUID) {
        ChannelTopic topic = topics.get(roomUUID);
        if (topic == null)
            topic = new ChannelTopic(roomUUID);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomUUID, topic);
    }

    public ChannelTopic getTopic(String roomUUID) {
        return topics.get(roomUUID);
    }
}


