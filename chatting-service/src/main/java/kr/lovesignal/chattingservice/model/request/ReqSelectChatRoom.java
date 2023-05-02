package kr.lovesignal.chattingservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReqSelectChatRoom {

    private String selectorUUID;
    private String selectedUUID;
    @Builder.Default
    private String love = "F";

}
