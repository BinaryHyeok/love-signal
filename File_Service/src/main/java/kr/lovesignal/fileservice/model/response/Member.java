package kr.lovesignal.fileservice.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class Member {
    private String nickname;
    private int age;
    private String description;
    private String profileImage;
    private String memberUUID;
    private boolean teamLeader;
}
