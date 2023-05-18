package kr.lovesignal.fileservice.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import kr.lovesignal.fileservice.entity.MemberEntity;
import kr.lovesignal.fileservice.entity.ProfileImageEntity;
import kr.lovesignal.fileservice.exception.CustomException;
import kr.lovesignal.fileservice.exception.ErrorCode;
import kr.lovesignal.fileservice.model.response.*;
import kr.lovesignal.fileservice.repository.MemberRepository;
import kr.lovesignal.fileservice.repository.ProfileImageRepository;
import kr.lovesignal.fileservice.util.CommonUtils;
import kr.lovesignal.fileservice.util.ResponseUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3FileServiceImpl implements S3FileService {

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;

	@Value("${cloud.aws.s3.profile-path}")
	private String profilePath;

	@Value("${cloud.aws.s3.chatfile-path}")
	private String chatFilePath;

	@Value("${cloud.aws.s3.default-profile}")
	private String defaultImage;

	private final AmazonS3 amazonS3;
	private final ResponseUtils responseUtils;
	private final CommonUtils commonUtils;
	private final MemberRepository memberRepository;
	private final ProfileImageRepository profileImageRepository;

	@Override
	@Transactional
	public SuccessResponse<String> uploadProfileImages(String strMemberUUID, MultipartFile profileImage) {

		// 프로필 이미지 가져오기
		if(profileImage == null){
			throw new CustomException(ErrorCode.FILE_IS_NULL);
		}

		// 이미지 이름 세팅
		StringBuilder sb = new StringBuilder();
		UUID profileImageUUID = UUID.randomUUID();
		sb.append(profilePath).append(profileImageUUID).append("-").append(profileImage.getOriginalFilename());
		String s3FileName = sb.toString();

		// s3에 저장
		ObjectMetadata objMeta = new ObjectMetadata();
		try {
			objMeta.setContentLength(profileImage.getInputStream().available());
			amazonS3.putObject(bucket, s3FileName, profileImage.getInputStream(), objMeta);
		}
		catch (IOException e){
			throw new CustomException(ErrorCode.CAN_NOT_PROCESSING_PROFILE_IMAGE);
		}

		// 저장된 이름
		String storedName = amazonS3.getUrl(bucket, s3FileName).toString();

		// 멤버 찾기
		UUID memberUUID = commonUtils.getValidUUID(strMemberUUID);
		MemberEntity findMember = memberRepository.findByUUIDAndExpired(memberUUID, "F")
				.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

		// 멤버로 프로필 이미지 찾기
		ProfileImageEntity updateProfileImage = profileImageRepository.findByMemberAndExpired(findMember, "F");

		//프로필 이미지를 찾았다면 만료처리하고 저장
		if(updateProfileImage != null){
			updateProfileImage.setExpired("T");
			profileImageRepository.save(updateProfileImage);
		}

		// 새 프로필 이미지 저장
		ProfileImageEntity saveProfileImage = createProfileImage(findMember, storedName);
		profileImageRepository.save(saveProfileImage);

		return responseUtils.buildSuccessResponse(storedName);
	}

	@Override
	@Transactional(readOnly = true)
	public String getProfileImageByMemberUUID(String strMemberUUID) {

		UUID memberUUID = commonUtils.getValidUUID(strMemberUUID);

		MemberEntity findMember = memberRepository.findByUUIDAndExpired(memberUUID, "F")
				.orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

		ProfileImageEntity profileImage = profileImageRepository.findByMemberAndExpired(findMember, "F");

		if(profileImage == null){
			return defaultImage;
		}

		return profileImage.getStoredName();
	}

	@Override
	public TeamResponse getProfileImagesByTeams(TeamResponse teamResponse) {

		TeamResponse teamResponseResult = teamResponse;

		for(int i = 0; i < teamResponseResult.getTeams().size(); i++){
			Team team = teamResponseResult.getTeams().get(i);
			List<Member> members = team.getMembers();
			for(int j = 0; j < members.size(); j++){
				String profileImage = getProfileImageByMemberUUID(members.get(j).getMemberUUID());
				teamResponseResult
						.getTeams()
						.get(i)
						.getMembers()
						.get(j)
						.setProfileImage(profileImage);
			}
		}

		return teamResponseResult;
	}

	@Override
	public Team getProfileImagesByTeam(Team team) {
		Team teamResult = team;
		List<Member> members = team.getMembers();

		for(int i = 0; i < members.size(); i++){
			String profileImage = getProfileImageByMemberUUID(members.get(i).getMemberUUID());
			teamResult
					.getMembers()
					.get(i)
					.setProfileImage(profileImage);
		}

		return teamResult;
	}

	@Override
	public MemberResponse getProfileImageByMember(MemberResponse memberResponse) {
		MemberResponse memberResult = memberResponse;
		String profileImage = getProfileImageByMemberUUID(memberResult.getMemberUUID());
		memberResult.setProfileImage(profileImage);

		return memberResult;
	}

	public ProfileImageEntity createProfileImage(MemberEntity member, String storedName){
		return ProfileImageEntity.builder()
				.member(member)
				.storedName(storedName)
				.build();
	}
}