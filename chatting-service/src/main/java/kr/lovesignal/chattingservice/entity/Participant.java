package kr.lovesignal.chattingservice.entity;

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
public class Participant extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long participantId;

    @ManyToOne
    @JoinColumn(name = "member_id", updatable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "roomId", updatable = false)
    private ChatRoom chatRoom;

}
