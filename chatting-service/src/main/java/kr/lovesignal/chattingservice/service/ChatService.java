package kr.lovesignal.chattingservice.service;

import kr.lovesignal.chattingservice.entity.ChatMessage;
import kr.lovesignal.chattingservice.model.request.ReqChatMessage;

import java.util.List;
import java.util.UUID;

public interface ChatService {
    void saveChatMessage(ReqChatMessage message);

    List<ReqChatMessage> getChatMessages(String roomUUID);

    void saveShareMessage(String userUUID, String oppositeTeamUUID);
}
