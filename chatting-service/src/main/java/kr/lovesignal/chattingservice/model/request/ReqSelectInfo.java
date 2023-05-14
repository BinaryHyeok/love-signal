package kr.lovesignal.chattingservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReqSelectInfo {

    private String selectorUUID;
    private String selectedNickname;

}
