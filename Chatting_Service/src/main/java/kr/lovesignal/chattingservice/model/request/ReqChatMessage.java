package kr.lovesignal.chattingservice.model.request;

import kr.lovesignal.chattingservice.model.response.ResChatMessage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@ToString
@Builder
public class ReqChatMessage {

    private String roomUUID;
    private String type;
    private String nickname;
    private String content;

    private SelectOrShareInfo selectOrShareInfo;

    public ResChatMessage toResChatMessage() {
        return ResChatMessage.builder()
                .redis_message_id(0)
                .roomUUID(this.roomUUID)
                .type(this.type)
                .nickname(this.nickname)
                .content(this.content)
                .notReadPerson(0)
                .UUID(UUID.randomUUID().toString())
                .createdDate(LocalDateTime.now().toString())
                .updatedDate(LocalDateTime.now().toString())
                .expired("F")
                .selectOrShareInfo(this.selectOrShareInfo)
                .build();
    }

}
