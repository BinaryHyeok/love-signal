package kr.lovesignal.memberservice.repository;


import kr.lovesignal.memberservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByUUIDAndExpiredLike(UUID UUID, String expired);

}
