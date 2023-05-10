package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileImageJpaRepository extends JpaRepository<ProfileImage, Long> {
}
