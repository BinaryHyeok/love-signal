package kr.lovesignal.authservice.model.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignInResponse {

    private String accessToken;
    private String refreshToken;
    private int accessTokenExpireTime;
    private int refreshTokenExpireTime;
    private String memberUUID;
    private String kakaoId;
}
