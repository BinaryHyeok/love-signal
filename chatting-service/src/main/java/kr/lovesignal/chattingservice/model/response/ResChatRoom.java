package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    private List<ResMember> memberList;

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
