package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import kr.lovesignal.teamservice.util.CommonUtils;
import kr.lovesignal.teamservice.util.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchingServiceImpl implements MatchingService {

    private final RedisUtils redisUtils;
    private final TeamService teamService;
    private final CommonUtils commonUtils;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final WebClientService webClientService;

    @Value("${redis-expire.recent-team}")
    private int recentTeamExpireTime;

    @Override
    public void addTeamMatching(String strMemberUUID) {

        // 대기열에 참가할 수 없는 유저
        boolean isBlocked = redisUtils.hasBlockUser(strMemberUUID);
        if(isBlocked){
            throw new CustomException(ErrorCode.MATCHING_BLOCKED_USER);
        }

        MemberEntity member = teamService.findMemberByMemberUUID(strMemberUUID);
        String gender = member.getGender();

        // 대기열에 참가
        redisUtils.addMatchingUser(strMemberUUID, gender);
        redisUtils.pushMatchingWaiting(strMemberUUID, gender);

        // 대기열에 3명 이상 존재한다면
        int matchingUserSize = redisUtils.getMatchingUserSize(gender);

        if(matchingUserSize >= 3){
            makeMatchingTeam(gender);
        }
        else{
            updateMatchingTeamMember(member, null,true, false);
        }
    }

    @Override
    public void cancelTeamMatching(String strMemberUUID) {

        MemberEntity member = teamService.findMemberByMemberUUID(strMemberUUID);

        // 이미 팀이 있을 경우
        if(member.getTeam() != null){
            throw new CustomException(ErrorCode.ALREADY_JOIN_TEAM);
        }

        boolean isMatching = redisUtils.hasMatchingUser(strMemberUUID, member.getGender());
        if(!isMatching){
            throw new CustomException(ErrorCode.NOT_IN_MEETING_WAITING);
        }

        updateMatchingTeamMember(member, null, false, false);

        redisUtils.removeMatchingUser(strMemberUUID, member.getGender());
    }

    @Transactional
    public void makeMatchingTeam(String gender){

        List<String> strMemberUUIDs = new ArrayList<>();
        List<UUID> memberUUIDs = new ArrayList<>();

        // 3명이 될 때 까지 진행
        while(memberUUIDs.size() < 3){
            // 대기열에서 뽑아서 매칭 중인 사람인 지 확인
            String memberUUID = redisUtils.popMatchingWaiting(gender);
            boolean isWaiting = redisUtils.hasMatchingUser(memberUUID, gender);
            // 매칭 중이라면 매칭 중인 것을 취소한다.
            if(isWaiting){
                // 알람으로 보낼 멤버들
                memberUUIDs.add(commonUtils.getValidUUID(memberUUID));
                strMemberUUIDs.add(memberUUID);
                // 매칭중인 유저정보 삭제
                redisUtils.removeMatchingUser(memberUUID, gender);
            }
        }
        // 팀 만들고
        TeamEntity team = TeamEntity.builder()
                .memberCount(3)
                .gender(gender)
                .build();

        teamRepository.save(team);

        // 멤버 업데이트
        for(int i = 0; i < memberUUIDs.size(); i++){
            MemberEntity member = memberRepository.findByUUIDAndExpired(memberUUIDs.get(i), "F")
                    .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
            if(i == 0){
                updateMatchingTeamMember(member, team,false, true);
            }
            else{
                updateMatchingTeamMember(member, team,false, false);
            }
        }

        // 최근 만든 팀에 넣는다.
        redisUtils.addRecentTeam(team.getUUID().toString(), recentTeamExpireTime);

        // 알람 보내고
        webClientService.sendMatchingTeamMemberUUIDs(memberUUIDs);
        webClientService.makeChatRoomApi(strMemberUUIDs);
    }

    @Transactional
    public void updateMatchingTeamMember(MemberEntity member, TeamEntity team, boolean isMatching, boolean isLeader){
        MemberEntity saveMember = MemberEntity.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .matchingStatus(isMatching ? "T" : "F")
                .receiveAlarm(member.getReceiveAlarm())
                .email(member.getEmail())
                .kakaoId(member.getKakaoId())
                .gender(member.getGender())
                .birth(member.getBirth())
                .description(member.getDescription())
                .teamLeader(isLeader ? "T" : "F")
                .profileImages(member.getProfileImages())
                .participants(member.getParticipants())
                .UUID(member.getUUID())
                .team(team)
                .createdDate(member.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(member.getExpired())
                .build();

        memberRepository.save(saveMember);
    }
}
