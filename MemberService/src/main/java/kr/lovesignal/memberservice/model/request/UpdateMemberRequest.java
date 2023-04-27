package kr.lovesignal.memberservice.model.request;

import kr.lovesignal.memberservice.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateMemberRequest {

    private String uuid;
    private String nickname;
    private String description;

    public MemberEntity toEntity(MemberEntity member){
        return MemberEntity.builder()
                .memberId(member.getMemberId())
                .loginId(member.getLoginId())
                .password(member.getPassword())
                .nickname(nickname)
                .gender(member.getGender())
                .birth(member.getBirth())
                .description(description)
                .help(member.getHelp())
                .uuid(member.getUuid())
                .createdDate(member.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(member.getExpired())
                .build();
    }

}
