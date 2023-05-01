package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.ThreadLocalRandom;

@Service
@RequiredArgsConstructor
public class InitDummyData {

    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    @Transactional
    @PostConstruct
    public void InitDummyData(){

        // 팀 생성
        for(int i = 1; i <= 20; i++){
            TeamEntity team = TeamEntity.builder()
                    .teamId(Integer.toUnsignedLong(i))
                    .gender(i > 10 ? "M" : "F")
                    .memberCount(3)
                    .meeting("F")
                    .build();

            teamRepository.save(team);
        }

        // 남자 팀 가입 유저
        Long manTeamId = 11L;
        int idx = 1;
        for(int i = 1; i <= 30; i++){
            LocalDate startDate = LocalDate.of(1990, 1, 1);
            LocalDate endDate = LocalDate.of(2003, 12, 31);
            long days = startDate.until(endDate, ChronoUnit.DAYS);
            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            MemberEntity member = MemberEntity.builder()
                    .loginId(Integer.toString(idx))
                    .password(Integer.toString(idx))
                    .birth(formattedDate)
                    .nickname(Integer.toString(idx))
                    .gender("M")
                    .description(Integer.toString(idx))
                    .team(teamRepository.findByTeamIdAndExpired(manTeamId, "F").get())
                    .teamLeader(i % 3 == 1 ? "T" : "F")
                    .build();
            idx++;
            if(i % 3 == 0) manTeamId++;
            memberRepository.save(member);
        }


        Long womanTeamId = 1L;
        // 여자 팀 가입 유저
        for(int i = 1; i <= 30; i++){
//            LocalDate startDate = LocalDate.of(1990, 1, 1);
//            LocalDate endDate = LocalDate.of(2003, 12, 31);
//            long days = startDate.until(endDate).getDays();
//            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
//            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
            LocalDate startDate = LocalDate.of(1990, 1, 1);
            LocalDate endDate = LocalDate.of(2003, 12, 31);
            long days = startDate.until(endDate, ChronoUnit.DAYS);
            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            MemberEntity member = MemberEntity.builder()
                    .loginId(Integer.toString(idx))
                    .password(Integer.toString(idx))
                    .birth(formattedDate)
                    .nickname(Integer.toString(idx))
                    .gender("F")
                    .description(Integer.toString(idx))
                    .team(teamRepository.findByTeamIdAndExpired(womanTeamId, "F").get())
                    .teamLeader(i % 3 == 1 ? "T" : "F")
                    .build();

            idx++;
            if(i % 3 == 0) womanTeamId++;
            memberRepository.save(member);
        }

        // 나머지 유저 생성
        for(int i = 1; i <= 40; i++){
            LocalDate startDate = LocalDate.of(1990, 1, 1);
            LocalDate endDate = LocalDate.of(2003, 12, 31);
            long days = startDate.until(endDate, ChronoUnit.DAYS);
            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            MemberEntity member = MemberEntity.builder()
                    .loginId(Integer.toString(idx))
                    .password(Integer.toString(idx))
                    .birth(formattedDate)
                    .nickname(Integer.toString(idx))
                    .gender(i > 20 ? "F" : "M")
                    .description(Integer.toString(idx))
                    .build();

            idx++;
            memberRepository.save(member);
        }

    }
}
