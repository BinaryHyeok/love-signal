package kr.lovesignal.fcmservice.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MeetingMemberList {
	private List<MemberInfo> meetingMemberList;
}
