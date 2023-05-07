package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MeetingEntity;
import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.repository.MeetingRepository;
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
    private final MeetingRepository meetingRepository;

    @Transactional
//    @PostConstruct
    public void InitDummyData(){

        // 팀 생성
        for(int i = 1; i <= 40; i++){
            TeamEntity team = TeamEntity.builder()
                    .teamId(Integer.toUnsignedLong(i))
                    .gender(i > 20 ? "F" : "M")
                    .memberCount(3)
                    .meeting("F")
                    .build();

            teamRepository.save(team);
        }

        // 남자 팀 가입 유저
        Long manTeamId = 1L;
        int idx = 1;
        for(int i = 1; i <= 60; i++){
            LocalDate startDate = LocalDate.of(1990, 1, 1);
            LocalDate endDate = LocalDate.of(2003, 12, 31);
            long days = startDate.until(endDate, ChronoUnit.DAYS);
            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            MemberEntity member = MemberEntity.builder()
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


        Long womanTeamId = 21L;
        // 여자 팀 가입 유저
        for(int i = 1; i <= 60; i++){
            LocalDate startDate = LocalDate.of(1990, 1, 1);
            LocalDate endDate = LocalDate.of(2003, 12, 31);
            long days = startDate.until(endDate, ChronoUnit.DAYS);
            LocalDate randomDate = startDate.plusDays(ThreadLocalRandom.current().nextLong(days + 1));
            String formattedDate = randomDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));

            MemberEntity member = MemberEntity.builder()
                    .email(Integer.toString(idx))
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
                    .email(Integer.toString(idx))
                    .birth(formattedDate)
                    .nickname(Integer.toString(idx))
                    .gender(i > 20 ? "F" : "M")
                    .description(Integer.toString(idx))
                    .build();

            idx++;
            memberRepository.save(member);
        }

        // 미팅 연결
        MeetingEntity meeting1 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(1L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(21L, "F").get())
                .build();
        meetingRepository.save(meeting1);

        MeetingEntity meeting2 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(1L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(22L, "F").get())
                .build();
        meetingRepository.save(meeting2);

        MeetingEntity meeting3 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(1L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(23L, "F").get())
                .build();
        meetingRepository.save(meeting3);

        MeetingEntity meeting4 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(2L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(21L, "F").get())
                .build();
        meetingRepository.save(meeting4);

        MeetingEntity meeting5 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(2L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(22L, "F").get())
                .build();
        meetingRepository.save(meeting5);

        MeetingEntity meeting6 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(2L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(23L, "F").get())
                .build();
        meetingRepository.save(meeting6);

        MeetingEntity meeting7 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(24L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(1L, "F").get())
                .build();
        meetingRepository.save(meeting7);

        MeetingEntity meeting8 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(24L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(2L, "F").get())
                .build();
        meetingRepository.save(meeting8);

        MeetingEntity meeting9 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(21L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(5L, "F").get())
                .build();
        meetingRepository.save(meeting9);

        MeetingEntity meeting10 = MeetingEntity.builder()
                .sendTeam(teamRepository.findByTeamIdAndExpired(21L, "F").get())
                .receiveTeam(teamRepository.findByTeamIdAndExpired(6L, "F").get())
                .build();
        meetingRepository.save(meeting10);

    }
}
