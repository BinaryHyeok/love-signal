package kr.lovesignal.fileservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "chatroom")
@Getter
@Setter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor
public class ChatRoomEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", columnDefinition = "INT UNSIGNED")
    private Long roomId;

    private String type;

    private String roomName;

    @Builder.Default
    @OneToMany(mappedBy = "chatRoom")
    @JsonIgnore
    private List<ParticipantEntity> participants = new ArrayList<>();

}
