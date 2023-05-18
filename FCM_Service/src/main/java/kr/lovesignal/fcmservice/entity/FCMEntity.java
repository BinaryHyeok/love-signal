package kr.lovesignal.fcmservice.entity;

import java.util.UUID;

import javax.persistence.*;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name ="fcm")
@Getter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class FCMEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fcm_id", columnDefinition = "INT UNSIGNED")
	private Long fcmId;

	@Column(name = "UUID", columnDefinition = "BINARY(16)")
	private UUID UUID;

	@Column(name = "token")
	private String token;

	@Column(name = "nickname")
	private String nickname;

//	@Id
//	@Column(name = "member_uuid")
//	private UUID memberUUID;
//
//	@Column(name = "token")
//	private String token;
//
//	@Column(name = "nickname")
//	private String nickname;

//	@Version
//	private Long version;
}
