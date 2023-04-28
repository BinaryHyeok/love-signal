package kr.lovesignal.chattingservice.model.request;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Builder
public class ReqChatMessage {

    private int redis_message_id;
    private String roomUUID;
    private String type;
    private String nickname;
    private String content;
    private int notReadPerson;
    private String UUID;
    private String createdDate;
    private String updatedDate;
    private String expired;

}
