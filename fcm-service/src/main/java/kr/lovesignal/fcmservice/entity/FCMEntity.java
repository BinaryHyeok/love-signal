package kr.lovesignal.fcmservice.entity;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "fcm")
@Getter
@Setter
public class FCMEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "fcm_id")
	private Long fcmId;

	@Column(name = "member_uuid")
	private UUID memberUUID;

	@Column(name = "token")
	private String token;
}
