package kr.lovesignal.fileservice.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberResponse {

    private String memberUUID;
    private String nickname;
    private String gender;
    private int age;
    private String description;
    private String teamUUID;
    private boolean teamLeader;
    private String profileImage;
    private boolean matchingStatus;
    private boolean receiveAlarm;
}
