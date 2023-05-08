package kr.lovesignal.apigateway.webclient;

import lombok.*;

@Setter
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class KakaoUUID {

    private String uuid;
}
