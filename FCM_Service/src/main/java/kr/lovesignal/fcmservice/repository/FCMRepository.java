package kr.lovesignal.fcmservice.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.lovesignal.fcmservice.entity.FCMEntity;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.LockModeType;

public interface FCMRepository extends JpaRepository<FCMEntity, Long> {

	List<FCMEntity> findAllByUUIDIn(List<UUID> memberUUIDs);

//	Optional<FCMEntity> findByMemberUUID(UUID memberUUID);

	FCMEntity findByUUID(UUID UUID);
}


