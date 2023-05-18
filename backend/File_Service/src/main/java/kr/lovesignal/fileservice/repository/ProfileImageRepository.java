package kr.lovesignal.fileservice.repository;

import kr.lovesignal.fileservice.entity.MemberEntity;
import kr.lovesignal.fileservice.entity.ProfileImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageRepository extends JpaRepository<ProfileImageEntity, Long> {

    ProfileImageEntity findByMemberAndExpired(MemberEntity member, String expired);
}
