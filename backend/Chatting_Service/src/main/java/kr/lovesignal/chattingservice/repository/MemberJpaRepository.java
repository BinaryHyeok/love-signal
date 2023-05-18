package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    Member findByUUID(UUID UUID);
    List<Member> findMemberByTeam(Team team);

    Member findMemberByNickname(String nickname);
}
