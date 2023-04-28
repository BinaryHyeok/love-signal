package kr.lovesignal.teamservice.model.response;

import kr.lovesignal.teamservice.entity.MemberEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
public class Member {
    private String nickname;
    private int age;
    private String description;

    public static List<Member> buildMembers(List<MemberEntity> memberEntities){
        List<Member> members = new ArrayList<>();
        for(MemberEntity memberEntity : memberEntities){
            LocalDate birthDate = LocalDate.parse(memberEntity.getBirth(), DateTimeFormatter.BASIC_ISO_DATE);
            int age = Period.between(birthDate, LocalDate.now()).getYears();
                    Member member = Member.builder()
                    .nickname(memberEntity.getNickname())
                    .age(age)
                    .description(memberEntity.getDescription())
                    .build();
            members.add(member);
        }
        return members;
    }
}
