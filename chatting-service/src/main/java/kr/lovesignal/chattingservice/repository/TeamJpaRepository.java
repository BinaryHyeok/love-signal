package kr.lovesignal.chattingservice.repository;

import kr.lovesignal.chattingservice.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TeamJpaRepository extends JpaRepository<Team, Long> {

    Team findByUUID(UUID uuid);

}
