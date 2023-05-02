package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.model.request.SelectOrShareInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResChatMessage {

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

    private SelectOrShareInfo selectOrShareInfo;

}
