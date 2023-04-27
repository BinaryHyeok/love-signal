package kr.lovesignal.teamservice.service;

import kr.lovesignal.teamservice.entity.MemberEntity;
import kr.lovesignal.teamservice.entity.TeamEntity;
import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import kr.lovesignal.teamservice.model.request.CreateTeamRequest;
import kr.lovesignal.teamservice.model.request.DeleteTeamRequest;
import kr.lovesignal.teamservice.model.response.SuccessResponse;
import kr.lovesignal.teamservice.model.response.TeamResponse;
import kr.lovesignal.teamservice.repository.MemberRepository;
import kr.lovesignal.teamservice.repository.TeamRepository;
import kr.lovesignal.teamservice.util.CommonUtils;
import kr.lovesignal.teamservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TeamServiceImpl implements TeamService{

    private final CommonUtils commonUtils;
    private final ResponseUtils responseUtils;
    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;

    @Override
    @Transactional
    public SuccessResponse<String> createTeam(String memberUUID) {

        UUID UUID = commonUtils.getValidUUID(memberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(hasTeam(findMember)){
            throw new CustomException(ErrorCode.ALREADY_JOIN_TEAM);
        }

        TeamEntity saveTeam = TeamEntity.builder()
                .gender(findMember.getGender())
                .build();
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, saveTeam);
        memberRepository.save(saveMember);

        return responseUtils.buildSuccessResponse("팀이 생성 되었습니다.");
    }

    @Override
    @Transactional
    public SuccessResponse<String> JoinTeam(String teamUUID, String memberUUID) {
        return null;
    }

    @Override
    @Transactional
    public SuccessResponse<String> leaveTeam(String memberUUID) {

        UUID UUID = commonUtils.getValidUUID(memberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!hasTeam(findMember)){
            throw new CustomException(ErrorCode.NOT_HAVE_TEAM);
        }

        // 해당 팀원 수를 하나 줄인다. 0일 경우에 팀은 해체된다.
        TeamEntity saveTeam = buildTeamEntityRemoveMember(findMember.getTeam());
        if(0 == saveTeam.getMemberCount()){
            saveTeam.setExpired("T");
        }
        teamRepository.save(saveTeam);

        MemberEntity saveMember = buildMemberEntityWithTeam(findMember, null);
        memberRepository.save(saveMember);

        return responseUtils.buildSuccessResponse("팀에서 탈퇴했습니다.");
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<TeamResponse> getTeamByTeamUUID(String teamUUID) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<List<TeamResponse>> getOtherGenderTeams(String gender) {
        return null;
    }

    public boolean hasTeam(MemberEntity member){
        return null != member.getTeam() ? true : false;
    }

    public MemberEntity buildMemberEntityWithTeam(MemberEntity member, TeamEntity team){
        return MemberEntity.builder()
                .memberId(member.getMemberId())
                .team(team)
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

    public TeamEntity buildTeamEntityRemoveMember(TeamEntity team){
        return TeamEntity.builder()
                .teamId(team.getTeamId())
                .gender(team.getGender())
                .memberCount(team.getMemberCount() - 1)
                .UUID(team.getUUID())
                .createdDate(team.getCreatedDate())
                .updatedDate(LocalDateTime.now())
                .expired(team.getExpired())
                .build();
    }
}