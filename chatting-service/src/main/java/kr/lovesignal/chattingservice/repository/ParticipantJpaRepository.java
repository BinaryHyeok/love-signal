package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ParticipantJpaRepository extends JpaRepository<Participant, Long> {
    Participant findByMemberAndChatRoom(Member member, ChatRoom chatRoom);

    List<Participant> findByChatRoom(ChatRoom chatRoom);
}
