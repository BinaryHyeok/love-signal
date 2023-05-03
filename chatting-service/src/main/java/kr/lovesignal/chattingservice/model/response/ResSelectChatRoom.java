package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResSelectChatRoom {

    private String UUID;
    private String type;
    private String roomName;
    private String createdDate;
    private String updatedDate;
    private String expired;

    private Member selector;
    private Member selected;
    @Builder.Default
    private String love = "F";

    public ChatRoom toEntity() {
        return ChatRoom.builder()
                .type(this.type)
                .roomName(this.roomName)
                .build();
    }

}
