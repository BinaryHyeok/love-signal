package kr.lovesignal.fcmservice.model.request;

import java.util.UUID;

import kr.lovesignal.fcmservice.entity.FCMEntity;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRequest {

	private String memberUUID;
	private String token;
	private String nickname;

	public FCMEntity toEntity(UUID UUID){
		return FCMEntity.builder()
			.memberUUID(UUID)
			.token(token)
			.build();
	}

}
