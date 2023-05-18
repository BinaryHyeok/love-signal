package kr.lovesignal.fileservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.fileservice.model.response.MemberResponse;
import kr.lovesignal.fileservice.model.response.SuccessResponse;
import kr.lovesignal.fileservice.model.response.Team;
import kr.lovesignal.fileservice.model.response.TeamResponse;
import kr.lovesignal.fileservice.service.S3FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Slf4j
@RestController
@RequiredArgsConstructor
@Api(tags = "FileController")
@RequestMapping("/file")
public class FileController {

	private final S3FileService s3FileService;

	@PostMapping("/profile/{memberUUID}")
	@ApiOperation(value = "프로필 이미지 등록")
	public ResponseEntity<SuccessResponse> uploadFile(
			@PathVariable String memberUUID,
			@RequestParam MultipartFile file) {

		SuccessResponse successResponse =
				s3FileService.uploadProfileImages(memberUUID, file);
		return ResponseEntity
				.status(HttpStatus.OK)
				.body(successResponse);
	}

	@PostMapping("/profile")
	@ApiOperation(value = "프로필 이미지 조회")
	public ResponseEntity<MemberResponse> getProfileImageByMemberUUID(@RequestBody MemberResponse memberResponse){

		MemberResponse memberResponseResult = s3FileService.getProfileImageByMember(memberResponse);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(memberResponseResult);
	}

	@PostMapping("/profiles/teams")
	@ApiOperation(value = "팀목록 이미지 조회")
	public ResponseEntity<TeamResponse> getProfileImagesByTeams(@RequestBody TeamResponse teamResponse){

		TeamResponse teamResponseResult = s3FileService.getProfileImagesByTeams(teamResponse);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(teamResponseResult);
	}

	@PostMapping("/profiles/team")
	@ApiOperation(value = "팀 이미지 조회")
	public ResponseEntity<Team> getProfileImagesByTeam(@RequestBody Team team){

		Team teamResult = s3FileService.getProfileImagesByTeam(team);

		return ResponseEntity
				.status(HttpStatus.OK)
				.body(teamResult);
	}
}
