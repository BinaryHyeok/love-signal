package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MeetingEntity;
import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.model.request.GetOppositeGenderTeamsRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import kr.lovesignal.teamservice.repository.MeetingRepository;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import kr.lovesignal.teamservice.util.CommonUtils;
import kr.lovesignal.teamservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Override
    @Transactional
    public SuccessResponse<String> createTeam(String strMemberUUID) {

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
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
    public SuccessResponse<String> JoinTeam(String strTeamUUID, String strMemberUUID) {
        UUID teamUUID = commonUtils.getValidUUID(strTeamUUID);
        UUID memberUUID = commonUtils.getValidUUID(strMemberUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpiredAndMeeting(teamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        if(findTeam.getMemberCount() >= 3){
            throw new CustomException(ErrorCode.TEAM_IS_FULL);
        }

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(memberUUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!findMember.getGender().equals(findTeam.getGender())){
            throw new CustomException(ErrorCode.CAN_NOT_JOIN_OPPOSITE_GENDER_TEAM);
        }

        TeamEntity saveTeam = buildTeamEntityUpdateMember(findTeam , true);
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, saveTeam, false);
        memberRepository.save(saveMember);

        return responseUtils.buildSuccessResponse("팀에 가입되었습니다.");
    }

    @Override
    @Transactional
    public SuccessResponse<String> leaveTeam(String strMemberUUID) {

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!hasTeam(findMember)){
            throw new CustomException(ErrorCode.NOT_HAVE_TEAM);
        }

        // 해당 팀원 수를 하나 줄인다. 0일 경우에 팀은 해체된다.
        TeamEntity saveTeam = buildTeamEntityUpdateMember(findMember.getTeam(), false);
        if(0 >= saveTeam.getMemberCount()){
            saveTeam.setExpired("T");
        }
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, null, false);
        memberRepository.save(saveMember);

        return responseUtils.buildSuccessResponse("팀에서 탈퇴했습니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<TeamResponse> getTeamByTeamUUID(String strTeamUUID) {

        UUID UUID = commonUtils.getValidUUID(strTeamUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpiredAndMeeting(UUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        TeamResponse teamResponse = makeTeam(findTeam);

        return responseUtils.buildSuccessResponse(teamResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<List<TeamResponse>> getOppositeGenderTeams(
            String gender,
            int size,
            GetOppositeGenderTeamsRequest getOppositeGenderTeamsRequest) {

        // Frontend에서 보낸 사용한 UUID를 String에서 UUID 형식으로 변경한다.
        List<UUID> usedUUIDs = null;
        if(getOppositeGenderTeamsRequest.getTeamUUIDList() != null && getOppositeGenderTeamsRequest.getTeamUUIDList().size() > 0){
            usedUUIDs = getOppositeGenderTeamsRequest.getTeamUUIDList().stream()
                    .map((strUUID -> commonUtils.getValidUUID(strUUID)))
                    .collect(Collectors.toList());
        }

        // DB에서 사용하지 않은 모든 Team들을 뽑아서 섞은 후 20개뽑는다.
        List<TeamEntity> notUsedTeams = teamRepository.findTeamsNotInUUIDsByGenderAndNotExpiredAndNotMeeting(gender, usedUUIDs);
        Collections.shuffle(notUsedTeams);
        int sendSize = notUsedTeams.size() < size ? sendSize = notUsedTeams.size() : size;
        notUsedTeams = notUsedTeams.subList(0, sendSize);

        // 이성 팀 목록을 만든다.
        List<TeamResponse> sendTeams = new ArrayList<>();
        for(TeamEntity teamEntity : notUsedTeams){
            TeamResponse teamResponse = makeTeam(teamEntity);
            sendTeams.add(teamResponse);
        }

        return responseUtils.buildSuccessResponse(sendTeams);
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<List<TeamResponse>> getMeetingRequests(String strTeamUUID) {

        UUID UUID = commonUtils.getValidUUID(strTeamUUID);

        TeamEntity findTeam = teamRepository.findByUUIDAndExpiredAndMeeting(UUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        List<MeetingEntity> proposeTeamEntities = meetingRepository.findByRequestTeam(findTeam);

        List<TeamResponse> proposeTeams = new ArrayList<>();
        for(MeetingEntity meetingEntity : proposeTeamEntities){
            TeamResponse teamResponse = makeTeam(meetingEntity.getProposeTeam());
            proposeTeams.add(teamResponse);
        }

        return responseUtils.buildSuccessResponse(proposeTeams);
    }

    @Override
    @Transactional
    public SuccessResponse<String> createMeetingRequest(String strTeamUUID, String strOppositeTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strTeamUUID, strOppositeTeamUUID);

        MeetingEntity saveMeeting = MeetingEntity.builder()
                .proposeTeam(teams.get(0))
                .requestTeam(teams.get(1))
                .build();

        meetingRepository.save(saveMeeting);

        return responseUtils.buildSuccessResponse("미팅을 신청했습니다.");
    }

    @Override
    @Transactional
    public SuccessResponse<String> accpetMeeting(String strTeamUUID, String strOppositeTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strOppositeTeamUUID, strTeamUUID);
        for(TeamEntity team : teams){
            deleteAllMeeting(team);
            teamRepository.save(buildmeetingTeamEntity(team));
        }

        // WebClinet로 성사되었다고 보내기

        return responseUtils.buildSuccessResponse("미팅이 성사되었습니다.");
    }

    @Override
    @Transactional
    public SuccessResponse<String> rejectMeeting(String strTeamUUID, String strOppositeTeamUUID) {

        List<TeamEntity> teams = getMeetingTeams(strOppositeTeamUUID, strTeamUUID);

        MeetingEntity deleteMeeting = meetingRepository.findByProposeTeamAndRequestTeam(teams.get(0), teams.get(1))
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_MATCHING_TEAM));

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
                .loginId(member.getLoginId())
                .password(member.getPassword())
                .nickname(member.getNickname())
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

    public TeamEntity buildmeetingTeamEntity(TeamEntity team){
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
    public TeamResponse makeTeam(TeamEntity teamEntity){
        List<MemberEntity> memberEntities = memberRepository.findByTeamAndExpired(teamEntity, "F");
        TeamResponse teamResponse = TeamResponse.buildTeamResponse(teamEntity, memberEntities);
        return teamResponse;
    }

    // 0 : 신청한 팀, 1 : 신청을 받은 팀
    @Transactional(readOnly = true)
    public List<TeamEntity> getMeetingTeams(String strProposeTeamUUID, String strRequestTeamUUID){
        UUID proposeTeamUUID = commonUtils.getValidUUID(strProposeTeamUUID);
        UUID requestTeamUUID = commonUtils.getValidUUID(strRequestTeamUUID);

        TeamEntity proposeTeam = teamRepository.findByUUIDAndExpiredAndMeeting(proposeTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        TeamEntity requestTeam = teamRepository.findByUUIDAndExpiredAndMeeting(requestTeamUUID, "F", "F")
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        List<TeamEntity> teams = new ArrayList<>();
        teams.add(proposeTeam);
        teams.add(requestTeam);

        return teams;
    }

    @Transactional
    public void deleteAllMeeting(TeamEntity team){
        meetingRepository.deleteByRequestTeam(team);
        meetingRepository.deleteByProposeTeam(team);
    }
}