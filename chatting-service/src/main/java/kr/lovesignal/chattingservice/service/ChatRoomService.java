package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.model.request.ReqChatRoom;
import kr.lovesignal.chattingservice.model.response.ResChatRoomDto;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    void enterChatRoom(String roomUUID);
    ChannelTopic getTopic(String roomId);
    ChatRoom createSystemChatroom(ReqChatRoom chatRoomDto, String userUUID);

    ChatRoom createSameGenderChatRoom(ReqChatRoom chatRoomDto, List<String> userUUIDs);

    List<ResChatRoomDto> getChatRoomList(String userUUID);

    ResChatRoomDto getChatRoom(String roomUUID);
}
