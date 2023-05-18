package kr.lovesignal.teamservice.repository;

import kr.lovesignal.teamservice.entity.MeetingTeamEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingTeamRepository extends JpaRepository<MeetingTeamEntity, Long> {

    Optional<MeetingTeamEntity> findByMaleTeamAndExpired(TeamEntity maleTeam, String expired);

    Optional<MeetingTeamEntity> findByFemaleTeamAndExpired(TeamEntity femaleTeam, String expired);


}
