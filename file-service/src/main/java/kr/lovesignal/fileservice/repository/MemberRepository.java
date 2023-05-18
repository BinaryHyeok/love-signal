package kr.lovesignal.fileservice.repository;


import kr.lovesignal.fileservice.entity.MemberEntity;
import kr.lovesignal.fileservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {


    Optional<MemberEntity> findByUUIDAndExpired(UUID UUID, String expired);

    Optional<MemberEntity> findMemberByMemberIdAndExpired(Long memberId, String expired);

    MemberEntity findByNicknameAndExpired(String nickname, String expired);

    List<MemberEntity> findByTeamAndExpired(TeamEntity team, String expired);
}
