package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.model.response.Member;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final WebClientService webClientService;


    @Scheduled(cron = "59 59 9 * * *", zone = "Asia/Seoul")
    public void sendMeetingMemberUUIDs(){
//        List<UUID> memberUUIDs = new ArrayList<>();
//        List<TeamEntity> meetingTeams = teamRepository.findByMeetingAndExpired("T", "F");
//
//        for(TeamEntity meetingTeam : meetingTeams){
//            List<MemberEntity> meetingMembers = memberRepository.findByTeamAndExpired(meetingTeam, "F");
//            for(MemberEntity meetingMember : meetingMembers){
//                memberUUIDs.add(meetingMember.getUUID());
//            }
//        }
//
//        webClientService.sendMeetingMemberUUIDs(memberUUIDs);

        for(int i = 0; i < 100; i++){
        System.out.println("스케쥴러 되냐?");
        }
    }
}
