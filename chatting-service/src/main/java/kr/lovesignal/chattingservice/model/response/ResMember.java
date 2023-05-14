package kr.lovesignal.chattingservice.model.response;

import kr.lovesignal.chattingservice.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@Builder
public class ResMember implements Serializable {

    private String memberUUID;
    private String nickname;
    private String gender;
    private int age;
    private String description;
    private String profileImage;

    public static ResMember toDto(Member member) {
        return ResMember.builder()
                .memberUUID(member.getUUID().toString())
                .nickname(member.getNickname())
                .gender(member.getGender())
                .description(member.getDescription())
                .build();
    }

}
