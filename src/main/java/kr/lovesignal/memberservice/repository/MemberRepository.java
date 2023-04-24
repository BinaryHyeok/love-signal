package kr.lovesignal.memberservice.repository;


import kr.lovesignal.memberservice.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, Long> {

}
