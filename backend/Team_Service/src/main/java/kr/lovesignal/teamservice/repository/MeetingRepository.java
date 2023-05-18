package kr.lovesignal.teamservice.repository;

import kr.lovesignal.teamservice.entity.MeetingEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<MeetingEntity, Long> {

    List<MeetingEntity> findBySendTeam(TeamEntity sendTeam);

    List<MeetingEntity> findByReceiveTeam(TeamEntity receiveTeam);

    void deleteBySendTeam(TeamEntity sendTeam);

    void deleteByReceiveTeam(TeamEntity receiveTeam);

    MeetingEntity findBySendTeamAndReceiveTeam(TeamEntity sendTeam, TeamEntity receiveTeam);
}
