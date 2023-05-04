package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantJpaRepository extends JpaRepository<Participant, Long> {

}
