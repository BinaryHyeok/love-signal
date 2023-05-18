package kr.lovesignal.teamservice.model.response;

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
