package kr.lovesignal.chattingservice.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;
    private String loginId;
    private String password;
    private String nickname;
    private char gender;
    private String birth;
    private String description;
    private char help;

    @ManyToOne
    @JoinColumn(name = "team_id", referencedColumnName = "team_id")
    private Team team;

    @Builder.Default
    @OneToMany(mappedBy = "member")
    private List<Participant> participants = new ArrayList<>();



}
