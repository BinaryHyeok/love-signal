package kr.lovesignal.teamservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name ="profile_image")
@Getter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfileImageEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_image_id", columnDefinition = "INT UNSIGNED")
    private Long profileImageId;

    @OneToOne
    @JoinColumn(name = "member_id", nullable = false)
    private MemberEntity member;

    @Column(name = "stored_name", nullable = false)
    private String storedName;
}
