package kr.lovesignal.authservice.repository;

import kr.lovesignal.authservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    MemberEntity findByNicknameAndExpiredLike(String nickname, String expired);

    MemberEntity findByEmailAndExpired(String email, String expired);

    Optional<MemberEntity> findByUUIDAndExpired(UUID UUID, String expired);
}
