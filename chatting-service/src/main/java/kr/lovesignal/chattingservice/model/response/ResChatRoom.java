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
import java.util.UUID;

@Getter
@Setter
@Builder
public class ResChatRoom implements Serializable{

    private String UUID;
    private String type;
    private String roomName;
    private String createdDate;
    private String updatedDate;
    private String expired;
    @Builder.Default
    private int selectCount = 0;
    private List<ResMember> memberList;

    private ResMember selector;
    private ResMember selected;
    @Builder.Default
    private String love = "F";


    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .UUID(java.util.UUID.fromString(this.UUID))
                .type(this.type)
                .roomName(this.roomName)
                .selectCount(this.selectCount)
                .expired(this.expired)
                .build();
    }

    public static ResChatRoom toDto(ChatRoom chatRoom) {
        return ResChatRoom.builder()
                .UUID(chatRoom.getUUID().toString())
                .type(chatRoom.getType())
                .roomName(chatRoom.getRoomName())
                .selectCount(chatRoom.getSelectCount())
                .createdDate(chatRoom.getCreatedDate().toString())
                .updatedDate(chatRoom.getUpdatedDate().toString())
                .expired(chatRoom.getExpired())
                .build();
    }


}
