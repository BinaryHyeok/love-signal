package kr.lovesignal.authservice.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class SuccessResponse<T> {

    private LocalDateTime timestamp;
    private T body;
}
