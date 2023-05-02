package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.model.request.ReqChatRoom;
import kr.lovesignal.chattingservice.model.response.ResChatRoom;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    void enterChatRoom(String roomUUID);
    ChannelTopic getTopic(String roomId);
    ChatRoom createSystemChatroom(ReqChatRoom chatRoomDto, String memberUUID);

    ChatRoom createSameGenderChatRoom(ReqChatRoom chatRoomDto, List<String> memberUUIDs);

    void createOneToOneChatRoom(String selectorUUID, String selectedUUID);

    List<ResChatRoom> getChatRoomList(String userUUID);

    ResChatRoom getChatRoom(String roomUUID);
}
