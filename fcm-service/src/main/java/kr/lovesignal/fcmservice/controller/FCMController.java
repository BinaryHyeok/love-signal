package kr.lovesignal.fcmservice.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.lovesignal.fcmservice.model.request.TokenRequest;
import kr.lovesignal.fcmservice.service.FCMService;

@RestController
@RequestMapping("/fcm")
public class FCMController {
	private FCMService fcmService;

	public FCMController(FCMService fcmService){
		this.fcmService = fcmService;
	}

	@PostMapping("/token")
	public ResponseEntity<String> registerToken(@RequestBody TokenRequest tokenRequest){
		fcmService.registerToken(tokenRequest);

		return new ResponseEntity<>("Register Token", HttpStatus.OK);
	}

	@PostMapping("/notification")
	public ResponseEntity<String> sendNotification(@RequestBody List<UUID> memberUUIDs) {
		fcmService.sendNotification(memberUUIDs);

		return new ResponseEntity<>("Push Notifidcation", HttpStatus.OK);
	}

	@PostMapping("/building")
	public ResponseEntity<String> sendBuildingNotification(@RequestBody List<UUID> memberUUIDs) {
		fcmService.sendBuildingNotification(memberUUIDs);

		return new ResponseEntity<>("Team Building Notification", HttpStatus.OK);
	}

	@PostMapping("/meeting")
	public ResponseEntity<String> sendMeetingNotification(@RequestBody List<String> memberUUIDs) {
		fcmService.sendMeetingNotification(memberUUIDs);

		return new ResponseEntity<>("Meeting Notification", HttpStatus.OK);
	}

}
