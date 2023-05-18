package kr.lovesignal.memberservice.repository;


import kr.lovesignal.memberservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByUUIDAndExpired(UUID UUID, String expired);

    MemberEntity findByEmailAndExpired(String email, String expired);

    MemberEntity findByNickname(String nickname);

}
