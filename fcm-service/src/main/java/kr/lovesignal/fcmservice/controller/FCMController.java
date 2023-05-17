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

	@PostMapping("/cancel-team")
	public ResponseEntity<String> cancelTeamNotification(@RequestBody List<String> memberUUIDs){
		fcmService.sendTeamRemoveNotification(memberUUIDs);

		return new ResponseEntity<>("Team End Notification", HttpStatus.OK);
	}

	@PostMapping("/cancel-meeting")
	public ResponseEntity<String> cancelMeetingNotification(@RequestBody List<String> memberUUIDs){
		fcmService.sendMeetingRemoveNotification(memberUUIDs);

		return new ResponseEntity<>("Meeting End Notification", HttpStatus.OK);
	}

	@PostMapping("/secret/notification")
	public ResponseEntity<String> sendSecretNotification(@RequestBody List<String> memberUUIDs){
        fcmService.sendSecretNotification(memberUUIDs);

        return new ResponseEntity<>("Secret Notification", HttpStatus.OK);
    }

	@PostMapping("/signal/notification")
	public ResponseEntity<String> sendSignalNotification(@RequestBody List<String> memberUUIDs){
        fcmService.sendSignalNotification(memberUUIDs);

        return new ResponseEntity<>("Signal Notification", HttpStatus.OK);
    }

}
