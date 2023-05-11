package kr.lovesignal.fcmservice.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;

import kr.lovesignal.fcmservice.model.request.MeetingMemberList;
import kr.lovesignal.fcmservice.model.request.MemberInfo;

@Service
public class FCMServiceImpl implements FCMService{

	@Override
	public void sendSelectionNotification(MeetingMemberList meetingMemberList) {
		List<MemberInfo> memberInfoList = meetingMemberList.getMeetingMemberList();

		memberInfoList.forEach(memberInfo -> {
			Message message = Message.builder()
				.putData("title", "메세지 제모옥")
				.putData("content", "메세지 내요옹")
				.setToken(memberInfo.getToken())
				.build();

			try {
				String response = FirebaseMessaging.getInstance().send(message);
			}catch (Exception e){
				e.printStackTrace();
			}
		});



	}
}
