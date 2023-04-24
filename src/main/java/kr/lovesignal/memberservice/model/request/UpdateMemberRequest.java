package kr.lovesignal.memberservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateMemberRequest {

    private Long member_id;
    private String nickname;
    private String gender;
    private String birth;
    private String description;


}
