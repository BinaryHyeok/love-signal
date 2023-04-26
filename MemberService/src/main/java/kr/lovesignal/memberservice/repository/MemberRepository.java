package kr.lovesignal.memberservice.repository;


import kr.lovesignal.memberservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

    Optional<MemberEntity> findByLoginIdAndExpiredLike(String loginId, String expired);

    Optional<MemberEntity> findByMemberIdAndExpiredLike(Long memberId, String expired);

    MemberEntity findByNicknameAndExpiredLike(String nickname, String expired);
}
