package kr.lovesignal.memberservice.model.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SuccessResponse<T> {

    private LocalDateTime timestamp;
    private T body;
}
