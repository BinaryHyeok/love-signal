package kr.lovesignal.chattingservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReqSelectMessage {

    private String roomUUID;
    private String chatUUID;
    private String memberUUID;
    private String oppositeNickname;

}
