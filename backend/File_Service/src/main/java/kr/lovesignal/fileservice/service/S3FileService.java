package kr.lovesignal.fileservice.service;

import kr.lovesignal.fileservice.model.response.MemberResponse;
import kr.lovesignal.fileservice.model.response.SuccessResponse;
import kr.lovesignal.fileservice.model.response.Team;
import kr.lovesignal.fileservice.model.response.TeamResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface S3FileService {

    public SuccessResponse<String> uploadProfileImages(String memberUUID, MultipartFile multipartFile);

    public String getProfileImageByMemberUUID(String memberUUID);

    public TeamResponse getProfileImagesByTeams(TeamResponse teamResponse);

    public Team getProfileImagesByTeam(Team team);

    public MemberResponse getProfileImageByMember(MemberResponse memberResponse);
}
