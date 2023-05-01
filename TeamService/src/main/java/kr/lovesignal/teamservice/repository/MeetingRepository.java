package kr.lovesignal.teamservice.repository;

import kr.lovesignal.teamservice.entity.MeetingEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MeetingRepository extends JpaRepository<MeetingEntity, Long> {

    List<MeetingEntity> findByRequestTeam(TeamEntity requestTeam);

    List<MeetingEntity> findByProposeTeam(TeamEntity proposeTeam);

    void deleteByRequestTeam(TeamEntity requestTeam);

    void deleteByProposeTeam(TeamEntity proposeTeam);

    Optional<MeetingEntity> findByProposeTeamAndRequestTeam(TeamEntity proposeTeam, TeamEntity requestTeam);
}
