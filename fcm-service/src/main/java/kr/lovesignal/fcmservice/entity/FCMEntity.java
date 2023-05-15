package kr.lovesignal.fcmservice.entity;

import java.util.UUID;

import javax.persistence.*;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Table(name ="fcm")
@Getter
@DynamicInsert
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FCMEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fcm_id", columnDefinition = "INT UNSIGNED")
	private Long fcmId;

	@Column(name = "member_uuid", nullable = false, unique = true)
	private UUID memberUUID;

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

	@Version
	private Long version;
}
