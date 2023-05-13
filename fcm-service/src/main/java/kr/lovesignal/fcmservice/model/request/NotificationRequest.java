package kr.lovesignal.fcmservice.model.request;

import java.util.List;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationRequest {
	private List<UUID> memberUUIDs;
}
