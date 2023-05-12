package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MeetingEntity;
import kr.lovesignal.teamservice.entity.MeetingTeamEntity;
import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.Member;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.Team;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import kr.lovesignal.teamservice.repository.MeetingRepository;
import kr.lovesignal.teamservice.repository.MeetingTeamRepository;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import kr.lovesignal.teamservice.util.CommonUtils;
import kr.lovesignal.teamservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final CommonUtils commonUtils;
    private final ResponseUtils responseUtils;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final MeetingRepository meetingRepository;
    private final MeetingTeamRepository meetingTeamRepository;

    @Override
    @Transactional
    public SuccessResponse<String> createTeam(String strMemberUUID) {

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(hasTeam(findMember)){
            throw new CustomException(ErrorCode.ALREADY_JOIN_TEAM);
        }

        TeamEntity saveTeam = TeamEntity.builder()
                .gender(findMember.getGender())
                .build();

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, saveTeam, true);

        teamRepository.save(saveTeam);
        memberRepository.save(saveMember);

        String strUUID = saveTeam.getUUID().toString();

        return responseUtils.buildSuccessResponse(strUUID);
    }

    @Override
    @Transactional
    public int JoinTeam(String strTeamUUID, String strMemberUUID) {
        UUID teamUUID = commonUtils.getValidUUID(strTeamUUID);
        UUID memberUUID = commonUtils.getValidUUID(strMemberUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpiredAndMeeting(teamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        if(findTeam.getMemberCount() >= 3){
            throw new CustomException(ErrorCode.TEAM_IS_FULL);
        }

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(memberUUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!findMember.getGender().equals(findTeam.getGender())){
            throw new CustomException(ErrorCode.CAN_NOT_JOIN_OPPOSITE_GENDER_TEAM);
        }

        TeamEntity saveTeam = buildTeamEntityUpdateMember(findTeam , true);
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, saveTeam, false);
        memberRepository.save(saveMember);

        return saveTeam.getMemberCount();
    }

    @Override
    @Transactional
    public boolean[] leaveTeam(String strMemberUUID) {

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!hasTeam(findMember)){
            throw new CustomException(ErrorCode.NOT_HAVE_TEAM);
        }

        boolean isMeeting = false;
        boolean isRemainTeam = findMember.getTeam().getMemberCount() - 1 > 0 ? true : false;
        boolean isBuilding = findMember.getTeam().getMemberCount() == 3 ? true : false;

        // 미팅 중이라면 혼자만 탈퇴
        if("T".equals(findMember.getTeam().getMeeting())){
            isMeeting = true;
            isBuilding = true;
        }

        return new boolean[]{isMeeting, isRemainTeam, isBuilding};
    }

    @Override
    @Transactional(readOnly = true)
    public Team getTeamByTeamUUID(String strTeamUUID) {

        UUID UUID = commonUtils.getValidUUID(strTeamUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        Team team = makeTeam(findTeam);

        return team;
    }

    @Override
    @Transactional(readOnly = true)
    public TeamResponse getOppositeGenderTeams(
            String gender,
            int size,
            GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest) {

        // Frontend에서 보낸 사용한 UUID를 String에서 UUID 형식으로 변경한다.
        List<UUID> usedUUIDs;
        List<TeamEntity> notUsedTeams;
        if(getOppositeGenderTeamsRequest.getTeamUUIDList() != null && getOppositeGenderTeamsRequest.getTeamUUIDList().size() > 0){
            usedUUIDs = getOppositeGenderTeamsRequest.getTeamUUIDList().stream()
                    .map((strUUID -> commonUtils.getValidUUID(strUUID)))
                    .collect(Collectors.toList());

            notUsedTeams = teamRepository.findTeamsNotInUUIDsByGenderAndNotExpiredAndNotMeeting(gender, usedUUIDs);

        }
        else{
            notUsedTeams = teamRepository.findTeamsByGenderAndNotExpiredAndNotMeeting(gender);

        }
        Collections.shuffle(notUsedTeams);

        boolean isRemain = true;
        int sendSize = size;
        if(notUsedTeams.size() <= size){
            isRemain = false;
            sendSize = notUsedTeams.size();
        }
        notUsedTeams = notUsedTeams.subList(0, sendSize);

        // 이성 팀 목록을 만든다.
        List<Team> teams = new ArrayList<>();
        for(TeamEntity teamEntity : notUsedTeams){
            Team team = makeTeam(teamEntity);
            teams.add(team);
        }

        TeamResponse teamResponse = TeamResponse.builder()
                .hasRemainingTeam(isRemain)
                .teams(teams)
                .build();

        return teamResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public TeamResponse getReceivedMeetings(String strReceiveTeamUUID) {

        UUID receiveTeamUUID = commonUtils.getValidUUID(strReceiveTeamUUID);

        TeamEntity receiveTeam = teamRepository.findByUUIDAndExpiredAndMeeting(receiveTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        List<MeetingEntity> sendTeamEntities = meetingRepository.findByReceiveTeam(receiveTeam);

        List<Team> sendTeams = new ArrayList<>();
        for(MeetingEntity sendTeam : sendTeamEntities){
            if("F".equals(sendTeam.getSendTeam().getExpired())){
                Team team = makeTeam(sendTeam.getSendTeam());
                sendTeams.add(team);
            }
        }

        TeamResponse teamResponse = TeamResponse.builder()
                .hasRemainingTeam(true)
                .teams(sendTeams)
                .build();

        return teamResponse;
    }

    @Override
    @Transactional(readOnly = true)
    public TeamResponse getSentMeetings(String strSendTeamUUID) {

        UUID sendTeamUUID = commonUtils.getValidUUID(strSendTeamUUID);

        TeamEntity sendTeam = teamRepository.findByUUIDAndExpiredAndMeeting(sendTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        List<MeetingEntity> receiveTeamEntities = meetingRepository.findBySendTeam(sendTeam);

        List<Team> receiveTeams = new ArrayList<>();
        for(MeetingEntity receiveTeam : receiveTeamEntities){
            Team team = makeTeam(receiveTeam.getReceiveTeam());
            receiveTeams.add(team);
        }

        TeamResponse teamResponse = TeamResponse.builder()
                .hasRemainingTeam(true)
                .teams(receiveTeams)
                .build();

        return teamResponse;
    }

    @Override
    @Transactional
    public SuccessResponse<String> createMeeting(String strSendTeamUUID, String strReceiveTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strSendTeamUUID, strReceiveTeamUUID);

        TeamEntity sendTeam = teams.get(0);
        TeamEntity receiveTeam = teams.get(1);

        MeetingEntity findMeeting = meetingRepository.findBySendTeamAndReceiveTeam(sendTeam, receiveTeam);

        if(null != findMeeting){
            throw new CustomException(ErrorCode.ALREADY_SENT_MEETING);
        }

        MeetingEntity saveMeeting = MeetingEntity.builder()
                .sendTeam(teams.get(0))
                .receiveTeam(teams.get(1))
                .build();

        meetingRepository.save(saveMeeting);

        return responseUtils.buildSuccessResponse("미팅을 신청했습니다.");
    }

    @Override
    @Transactional
    public void accpetMeeting(String strReceiveTeamUUID, String strSendTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strSendTeamUUID, strReceiveTeamUUID);

        TeamEntity maleTeam = null;
        TeamEntity femaleTeam = null;

        for(TeamEntity team : teams){
            if("M".equals(team.getGender())){
                maleTeam = team;
            }
            else{
                femaleTeam = team;
            }
        }

        MeetingTeamEntity saveMeetingTeam = MeetingTeamEntity.builder()
                .maleTeam(maleTeam)
                .femaleTeam(femaleTeam)
                .build();

        meetingTeamRepository.save(saveMeetingTeam);

        for(TeamEntity team : teams){
            deleteAllMeeting(team);
            teamRepository.save(buildMeetingTeamEntity(team));
        }
    }

    @Override
    @Transactional
    public SuccessResponse<String> rejectMeeting(String strReceiveTeamUUID, String strSendTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strSendTeamUUID, strReceiveTeamUUID);

        TeamEntity sendTeam = teams.get(0);
        TeamEntity receiveTeam = teams.get(1);
        MeetingEntity deleteMeeting = meetingRepository.findBySendTeamAndReceiveTeam(sendTeam, receiveTeam);

        if(null == deleteMeeting){
            throw new CustomException(ErrorCode.NOT_MATCHING_TEAM);
        }

        meetingRepository.delete(deleteMeeting);

        return responseUtils.buildSuccessResponse("미팅을 거절했습니다.");
    }


    public boolean hasTeam(MemberEntity member){
        return null != member.getTeam() ? true : false;
    }

    public MemberEntity buildMemberEntityWithTeam(MemberEntity member, TeamEntity team, boolean isTeamLeader){
        return MemberEntity.builder()
                .memberId(member.getMemberId())
                .team(team)
                .teamLeader(isTeamLeader == true ? "T" : "F")
                .kakaoId(member.getKakaoId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .participants(member.getParticipants())
                .profileImages(member.getProfileImages())
                .gender(member.getGender())
                .birth(member.getBirth())
                .description(member.getDescription())
                .UUID(member.getUUID())
                .expired(member.getExpired())
                .createdDate(member.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .build();
    }

    public TeamEntity buildTeamEntityUpdateMember(TeamEntity team, boolean isJoin){
        return TeamEntity.builder()
                .teamId(team.getTeamId())
                .gender(team.getGender())
                .memberCount(isJoin == true ? team.getMemberCount() + 1 : team.getMemberCount() - 1)
                .meeting(team.getMeeting())
                .UUID(team.getUUID())
                .createdDate(team.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(team.getExpired())
                .build();
    }

    public TeamEntity buildMeetingTeamEntity(TeamEntity team){
        return TeamEntity.builder()
                .teamId(team.getTeamId())
                .gender(team.getGender())
                .memberCount(team.getMemberCount())
                .meeting("T")
                .UUID(team.getUUID())
                .createdDate(team.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(team.getExpired())
                .build();
    }

    @Transactional(readOnly = true)
    public Team makeTeam(TeamEntity teamEntity){
        List<MemberEntity> memberEntities = memberRepository.findByTeamAndExpired(teamEntity, "F");
        Team team = Team.buildTeamResponse(teamEntity, memberEntities);
        return team;
    }

    // 0 : 신청한 팀, 1 : 신청을 받은 팀
    @Transactional(readOnly = true)
    public List<TeamEntity> getMeetingTeams(String strSendTeamUUID, String strReceiveTeamUUID){
        UUID sendTeamUUID = commonUtils.getValidUUID(strSendTeamUUID);
        UUID receiveTeamUUID = commonUtils.getValidUUID(strReceiveTeamUUID);

        TeamEntity sendTeam = teamRepository.findByUUIDAndExpiredAndMeeting(sendTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        TeamEntity receiveTeam = teamRepository.findByUUIDAndExpiredAndMeeting(receiveTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        if(sendTeam.getGender().equals(receiveTeam.getGender())){
            throw new CustomException(ErrorCode.CAN_NOT_MEETING_SAME_GENDER_TEAM);
        }

        List<TeamEntity> teams = new ArrayList<>();
        teams.add(sendTeam);
        teams.add(receiveTeam);

        return teams;
    }

    @Transactional
    public void deleteAllMeeting(TeamEntity team){
        meetingRepository.deleteBySendTeam(team);
        meetingRepository.deleteByReceiveTeam(team);
    }

    @Transactional(readOnly = true)
    public List<String> makeChatRoomMembers(String strTeamUUID){
        UUID teamUUID = commonUtils.getValidUUID(strTeamUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpired(teamUUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        List<MemberEntity> findMembers = memberRepository.findByTeamAndExpired(findTeam, "F");

        List<String> memberUUIDs = new ArrayList<>();
        for(MemberEntity member : findMembers){
            memberUUIDs.add(member.getUUID().toString());
        }

        return memberUUIDs;
    }

    @Transactional(readOnly = true)
    public List<String> makeChatRoomMembers(String strTeamUUID, String strOppositeTeamUUID){
        List<String> memberUUIDs = new ArrayList<>();
        memberUUIDs.addAll(makeChatRoomMembers(strTeamUUID));
        memberUUIDs.addAll(makeChatRoomMembers(strOppositeTeamUUID));

        return memberUUIDs;
    }



    @Transactional
    public List<String> deleteMemberFromTeam(String strMemberUUID){
        List<String> memberUUIDs = new ArrayList<>();

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity leaveMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        TeamEntity saveTeam = buildTeamEntityUpdateMember(leaveMember.getTeam(), false);
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(leaveMember, null, false);
        memberRepository.save(saveMember);

        memberUUIDs.add(strMemberUUID);
        return memberUUIDs;
    }

    @Transactional
    public List<String> deleteMeetingTeam(String strMemberUUID){
        List<String> memberUUIDs = new ArrayList<>();

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity leaveMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MeetingTeamEntity meetingTeam = findMeetingTeam(leaveMember.getTeam());
        TeamEntity maleTeam = meetingTeam.getMaleTeam();
        TeamEntity femaleTeam = meetingTeam.getFemaleTeam();

        memberUUIDs.addAll(terminateTeam(maleTeam));
        memberUUIDs.addAll(terminateTeam(femaleTeam));

        MeetingTeamEntity expiredMeetingTeam = MeetingTeamEntity.builder()
                .meetingTeamId(meetingTeam.getMeetingTeamId())
                .maleTeam(maleTeam)
                .femaleTeam(femaleTeam)
                .UUID(meetingTeam.getUUID())
                .createdDate(meetingTeam.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired("T")
                .build();

        meetingTeamRepository.save(expiredMeetingTeam);

        return memberUUIDs;
    }

    @Transactional(readOnly = true)
    public MeetingTeamEntity findMeetingTeam(TeamEntity team){
        MeetingTeamEntity meetingTeam;
        if("M".equals(team.getGender())){
            meetingTeam = meetingTeamRepository.findByMaleTeamAndExpired(team, "F")
                    .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        }
        else{
            meetingTeam = meetingTeamRepository.findByFemaleTeamAndExpired(team, "F")
                    .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        }

        return meetingTeam;
    }

    @Transactional
    public List<String> deleteTeamByMember(String strMemberUUID){
        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity leaveMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        return terminateTeam(leaveMember.getTeam());
    }

    @Transactional
    public List<String> terminateTeam(TeamEntity team){
        List<String> memberUUIDs = new ArrayList<>();
        List<MemberEntity> members = memberRepository.findByTeamAndExpired(team, "F");

        for(MemberEntity member : members){
            memberUUIDs.add(member.getUUID().toString());
            MemberEntity saveMember = buildMemberEntityWithTeam(member, null, false);
            memberRepository.save(saveMember);
        }

        TeamEntity saveTeam = TeamEntity.builder()
                .teamId(team.getTeamId())
                .gender(team.getGender())
                .memberCount(0)
                .meeting(team.getMeeting())
                .UUID(team.getUUID())
                .createdDate(team.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired("T")
                .build();
        teamRepository.save(saveTeam);

        return memberUUIDs;
    }
}