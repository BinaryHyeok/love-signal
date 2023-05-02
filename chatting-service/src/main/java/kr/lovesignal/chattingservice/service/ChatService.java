package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;
import kr.lovesignal.chattingservice.model.response.ResChatMessage;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    void saveChatMessage(ReqChatMessage message);

    List<ResChatMessage> getChatMessages(String roomUUID);

    void saveShareMessage(String userUUID, String oppositeTeamUUID);

    void updateSelectMessage(String roomUUID, String chatUUID);

    void saveResultMessage(String roomUUID, String memberUUID, String oppositeNickname);
}
