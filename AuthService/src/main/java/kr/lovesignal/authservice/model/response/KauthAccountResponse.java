package kr.lovesignal.authservice.model.response;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class KauthAccountResponse {

    private Long id;
    private LocalDateTime connected_at;
    private KakaoAccount kakao_account;
}
