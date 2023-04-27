package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberJpaRepository extends JpaRepository<Member, Long> {

    Member findMemberByUUID(UUID userUUID);

}
