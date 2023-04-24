package kr.lovesignal.memberservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="member")
@Getter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEntity extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id", columnDefinition = "INT UNSIGNED")
    private Long member_id;

    @Column(name = "login_id", nullable = false, unique = true)
    private String login_id;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "gender", nullable = false, length = 1)
    private String gender;

    @Column(name = "birth", nullable = false, length = 8)
    private String birth;

    @Column(name = "description", nullable = true, length = 120)
    private String description;

    @Column(name = "help", nullable = false, length = 1)
    @ColumnDefault("'T'")
    private String help;
}
