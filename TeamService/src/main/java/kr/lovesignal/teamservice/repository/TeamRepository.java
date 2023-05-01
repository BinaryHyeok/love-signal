package kr.lovesignal.teamservice.repository;

import kr.lovesignal.teamservice.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {

    @Query("SELECT team " +
            "FROM TeamEntity team " +
            "WHERE team.gender = :gender " +
            "AND team.expired = 'F' " +
            "AND team.meeting = 'F' " +
            "AND team.memberCount = 3" +
            "AND (team.UUID NOT IN (:UUIDs) OR :UUIDs IS NULL)")
    List<TeamEntity> findTeamsNotInUUIDsByGenderAndNotExpiredAndNotMeeting(
            @Param("gender") String gender,
            @Param("UUIDs") List<UUID> UUIDs);

     Optional<TeamEntity> findByUUIDAndExpiredAndMeeting(UUID UUID, String expired, String Meeting);

     Optional<TeamEntity> findByTeamIdAndExpired(Long TeamId, String expired);

}
