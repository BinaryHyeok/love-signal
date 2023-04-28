package kr.lovesignal.chattingservice.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReqChatRoomInfo {

    private List<String> userUUIDs;
    private ReqChatRoom chatRoomDto;

}
