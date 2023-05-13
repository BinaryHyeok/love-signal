package kr.lovesignal.fcmservice.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRequest {

	private String memberUUID;
	private String token;

}
