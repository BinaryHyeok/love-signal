package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.model.ChatRoomDto;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    void enterChatRoom(long roomId);
    ChannelTopic getTopic(String roomId);
    ChatRoom createSystemChatroom(ChatRoomDto chatRoomDto, String userUUID);

    ChatRoom createSameGenderChatRoom(ChatRoomDto chatRoomDto, List<String> userUUIDs);

    List<ChatRoom> getChatRoomList(String userUUID);
}
