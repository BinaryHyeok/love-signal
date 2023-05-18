package kr.lovesignal.teamservice.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="team")
@Getter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TeamEntity extends BaseEntity{

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
