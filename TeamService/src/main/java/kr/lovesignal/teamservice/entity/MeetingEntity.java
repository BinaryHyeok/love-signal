package kr.lovesignal.teamservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="meeting")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id", columnDefinition = "INT UNSIGNED")
    private Long meetingId;

    @ManyToOne
    @JoinColumn(name = "propose_team", nullable = false)
    private TeamEntity proposeTeam;

    @ManyToOne
    @JoinColumn(name = "request_team", nullable = false)
    private TeamEntity requestTeam;
}
