package kr.lovesignal.fcmservice.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.utio.optional;

import org.springframework.data.jpa.repository.JpaRepository;

import kr.lovesignal.fcmservice.entity.FCMEntity;

public interface FCMRepository extends JpaRepository<FCMEntity, Long> {

	List<FCMEntity> findAllByMemberUUIDIn(List<UUID> memberUUIDs);

	Optional<FCMEntity> findByMemberUUID(UUID memberUUID);
}
