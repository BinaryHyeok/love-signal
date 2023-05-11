package kr.lovesignal.fcmservice.service;

import kr.lovesignal.fcmservice.model.request.MeetingMemberList;

public interface FCMService {
	void sendSelectionNotification(MeetingMemberList meetingMemberList);
}
