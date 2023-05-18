package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ResEnterChatRoom {

    private String UUID;
    private String type;
    private String roomName;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String expired;

    public static ResEnterChatRoom toDto(ChatRoom chatRoom) {
        return ResEnterChatRoom.builder()
                .UUID(chatRoom.getUUID().toString())
                .type(chatRoom.getType())
                .roomName(chatRoom.getRoomName())
                .createdDate(chatRoom.getCreatedDate())
                .updatedDate(chatRoom.getUpdatedDate())
                .expired(chatRoom.getExpired())
                .build();
    }

}
