package kr.lovesignal.teamservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="meeting_team")
@Getter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingTeamEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_team_id", columnDefinition = "INT UNSIGNED")
    private Long meetingTeamId;

    @OneToOne
    @JoinColumn(name = "male_team", nullable = false)
    private TeamEntity maleTeam;

    @OneToOne
    @JoinColumn(name = "female_team", nullable = false)
    private TeamEntity femaleTeam;
}
