package kr.lovesignal.fcmservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.lovesignal.fcmservice.model.request.MeetingMemberList;
import kr.lovesignal.fcmservice.service.FCMService;

@RestController
@RequestMapping("/fcm")
public class FCMController {
	private FCMService fcmService;

	@Autowired
	public FCMController(FCMService fcmService){
		this.fcmService = fcmService;
	}

	@PostMapping("/notification")
	public ResponseEntity<?> sendPushNotification(@RequestBody MeetingMemberList meetingMemberList){
		fcmService.sendSelectionNotification(meetingMemberList);

		return new ResponseEntity<>(HttpStatus.OK);
	}
}
