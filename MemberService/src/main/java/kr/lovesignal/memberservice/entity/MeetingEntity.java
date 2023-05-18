package kr.lovesignal.memberservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Table(name ="meeting")
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MeetingEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "meeting_id", columnDefinition = "INT UNSIGNED")
    private Long meetingId;

    @ManyToOne
    @JoinColumn(name = "send_team", nullable = false)
    private TeamEntity sendTeam;

    @ManyToOne
    @JoinColumn(name = "receive_team", nullable = false)
    private TeamEntity receiveTeam;
}
