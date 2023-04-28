package kr.lovesignal.chattingservice.model.request;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import lombok.*;

@Getter
@Setter
public class ReqChatRoom {

    private Long roomId;
    private String type;
    private String roomName;
    private String lastChat;
    private int notReadChat;

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .roomId(this.getRoomId())
                .type(this.getType())
                .roomName(this.getRoomName())
                .lastChat(this.getLastChat())
                .notReadChat(this.getNotReadChat())
                .build();
    }

}
