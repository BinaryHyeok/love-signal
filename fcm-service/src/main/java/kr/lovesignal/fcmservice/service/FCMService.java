package kr.lovesignal.fcmservice.service;

import java.util.List;
import java.util.UUID;

import kr.lovesignal.fcmservice.model.request.TokenRequest;

public interface FCMService {

	// 토큰 등록
	void registerToken(TokenRequest tokenRequest);

	// 선택의 시간 알람 보내기
	void sendNotification(List<UUID> memberUUIDs);

	// 팀 생성될 때
	void sendBuildingNotification(List<UUID> memberUUIDs);
}
