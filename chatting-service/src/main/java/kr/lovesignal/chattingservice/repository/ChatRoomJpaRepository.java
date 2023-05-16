package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRoomJpaRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoom findByUUID(UUID uuid);
    ChatRoom findByTeam(Team team);
    List<ChatRoom> findByTypeAndExpired(String type, String expired);
    List<ChatRoom> findByTypeInAndExpired(List<String> types, String expired);
}
