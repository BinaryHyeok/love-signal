package kr.lovesignal.apigateway.webclient;

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
}
