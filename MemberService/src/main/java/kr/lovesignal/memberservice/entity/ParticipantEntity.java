package kr.lovesignal.memberservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "participant")
@Getter
@Setter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ParticipantEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "participant_id", columnDefinition = "INT UNSIGNED")
    private Long participantId;

    @ManyToOne
    @JoinColumn(name = "member_id", updatable = false)
    private MemberEntity member;

    @ManyToOne
    @JoinColumn(name = "room_id", updatable = false)
    private ChatRoomEntity chatRoom;

}
