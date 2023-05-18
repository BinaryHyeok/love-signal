package kr.lovesignal.chattingservice.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name ="profile_image")
@Getter
@SuperBuilder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProfileImage extends BaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_image_id", columnDefinition = "INT UNSIGNED")
    private Long profileImageId;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "stored_name", nullable = false)
    private String storedName;
}
