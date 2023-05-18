package kr.lovesignal.teamservice.model.response;

import kr.lovesignal.teamservice.entity.MemberEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member {
    private String nickname;
    private int age;
    private String description;
    private String profileImage;
    private String memberUUID;
    private boolean teamLeader;

    public static List<Member> buildMembers(List<MemberEntity> memberEntities){
        List<Member> members = new ArrayList<>();
        for(MemberEntity memberEntity : memberEntities){
            LocalDate birthDate = LocalDate.parse(memberEntity.getBirth(), DateTimeFormatter.BASIC_ISO_DATE);
            int age = Period.between(birthDate, LocalDate.now()).getYears();
                    Member member = Member.builder()
                    .nickname(memberEntity.getNickname())
                    .age(age)
                    .memberUUID(memberEntity.getUUID().toString())
                    .description(memberEntity.getDescription())
                    .teamLeader("T".equals(memberEntity.getTeamLeader()) ? true : false)
                    .build();
            members.add(member);
        }
        return members;
    }
}
