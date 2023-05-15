package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.model.response.Member;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;
    private final WebClientService webClientService;


    @Scheduled(cron = "00 02 23 * * *", zone = "Asia/Seoul")
    @Transactional(readOnly = true)
    public void sendMeetingMemberUUIDs(){
        List<UUID> memberUUIDs = new ArrayList<>();
        List<TeamEntity> meetingTeams = teamRepository.findByMeetingAndExpired("T", "F");

        for(TeamEntity meetingTeam : meetingTeams){
            List<MemberEntity> meetingMembers = memberRepository.findByTeamAndExpired(meetingTeam, "F");
            for(MemberEntity meetingMember : meetingMembers){
                memberUUIDs.add(meetingMember.getUUID());
            }
        }

        webClientService.sendMeetingMemberUUIDs(memberUUIDs);

    }
}
