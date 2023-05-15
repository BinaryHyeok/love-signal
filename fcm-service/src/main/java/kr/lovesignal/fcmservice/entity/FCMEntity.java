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

@Entity
@Table(name = "fcm")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class FCMEntity {

	// @Id
	// @GeneratedValue(strategy = GenerationType.IDENTITY)
	// @Column(name = "fcm_id")
	// private Long fcmId;

	// @Column(name = "member_uuid")
	// private UUID memberUUID;

	// @Column(name = "token")
	// private String token;

	// @Column(name = "nickname")
	// private String nickname;

	@Id
	@Column(name = "member_uuid")
	private UUID memberUUID;

	@Column(name = "token")
	private String token;

	@Column(name = "nickname")
	private String nickname;

	@Version
	private Long version;
}
