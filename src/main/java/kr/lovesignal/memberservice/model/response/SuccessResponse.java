package kr.lovesignal.memberservice.model.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SuccessResponse<T> {

    private LocalDateTime timestamp;
    private T body;

    public SuccessResponse<T> buildResponse(T body){
        return SuccessResponse.<T>builder()
                .timestamp(LocalDateTime.now())
                .body(body)
                .build();
    }
}
