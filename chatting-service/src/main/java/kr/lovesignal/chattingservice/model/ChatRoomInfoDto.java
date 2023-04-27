package kr.lovesignal.chattingservice.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatRoomInfoDto {

    private List<String> userUUIDs;
    private ChatRoomDto chatRoomDto;

}
