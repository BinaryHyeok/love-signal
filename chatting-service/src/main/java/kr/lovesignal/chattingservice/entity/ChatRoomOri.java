package kr.lovesignal.chattingservice.entity;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class ChatRoomOri implements Serializable {

//    private static final long serialVersionUID = 6494678977089006689L;

    private String roomId;
    private String name;

    public static ChatRoomOri create(String name) {
        ChatRoomOri chatRoomOri = new ChatRoomOri();
        chatRoomOri.roomId = UUID.randomUUID().toString();
        chatRoomOri.name = name;
        return chatRoomOri;
    }

}
