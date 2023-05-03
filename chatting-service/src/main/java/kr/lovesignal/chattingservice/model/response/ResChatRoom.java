package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ResChatRoom {

    private String UUID;
    private String type;
    private String roomName;
    private String lastChat;
    private int notReadChat;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String expired;

    public static ResChatRoom toDto(ChatRoom chatRoom) {
        return ResChatRoom.builder()
                .UUID(chatRoom.getUUID().toString())
                .type(chatRoom.getType())
                .roomName(chatRoom.getRoomName())
                .createdDate(chatRoom.getCreatedDate())
                .updatedDate(chatRoom.getUpdatedDate())
                .expired(chatRoom.getExpired())
                .build();
    }


}
