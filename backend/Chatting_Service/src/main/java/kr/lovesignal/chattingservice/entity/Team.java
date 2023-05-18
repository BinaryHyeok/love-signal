package kr.lovesignal.chattingservice.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "team")
@Getter
@Setter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "team_id", columnDefinition = "INT UNSIGNED")
    private Long teamId;

    @Column(name = "gender", length = 1, nullable = false)
    private String gender;

    @Builder.Default
    @Column(name = "member_count", nullable = false)
    @ColumnDefault("1")
    private int memberCount = 1;

    @Column(name = "meeting", nullable = false, length = 1)
    @ColumnDefault("'F'")
    private String meeting;
}
