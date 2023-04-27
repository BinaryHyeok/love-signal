package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.entity.MemberEntity;
import kr.lovesignal.memberservice.exception.CustomException;
import kr.lovesignal.memberservice.exception.ErrorCode;
import kr.lovesignal.memberservice.model.request.DeleteMemberRequest;
import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import kr.lovesignal.memberservice.repository.MemberRepository;
import kr.lovesignal.memberservice.util.CommonUtils;
import kr.lovesignal.memberservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final ResponseUtils responseUtil;
    private final CommonUtils commonUtils;
    private final MemberRepository memberRepository;

    // 회원가입
    @Override
    @Transactional
    public SuccessResponse<String> registerMember(SignUpRequest signUpRequest) {

        MemberEntity saveMember = signUpRequest.toEntity();

        memberRepository.save(saveMember);

        return responseUtil.buildSuccessResponse("회원가입 되었습니다.");
    }

    // 로그인
    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<Long> authenticate(SignInRequest signInRequest) {

        MemberEntity findMember = memberRepository.findByLoginIdAndExpiredLike(signInRequest.getLoginId(), "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!findMember.getPassword().equals(signInRequest.getPassword())){
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

        return responseUtil.buildSuccessResponse(findMember.getUuid().toString());
    }

    // 멤버정보 수정
    @Override
    @Transactional
    public SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest) {

        UUID uuid = commonUtils.getValidUUID(updateMemberRequest.getUuid());

        MemberEntity findMember = memberRepository.findByUuidAndExpiredLike(uuid, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MemberEntity updateMember = updateMemberRequest.toEntity(findMember);

        memberRepository.save(updateMember);

        return responseUtil.buildSuccessResponse("수정 되었습니다.");
    }

    // 계정탈퇴
    @Override
    @Transactional
    public SuccessResponse<String> deleteMember(DeleteMemberRequest deleteMemberRequest) {

        UUID uuid = commonUtils.getValidUUID(deleteMemberRequest.getUuid());

        MemberEntity findMember = memberRepository.findByUuidAndExpiredLike(uuid, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        findMember.setExpired("T");

        memberRepository.save(findMember);

        return responseUtil.buildSuccessResponse("삭제 되었습니다.");
    }

    // 멤버조회
    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<MemberResponse> getMemberById(String uuidRequest) {

        UUID uuid = commonUtils.getValidUUID(uuidRequest);

        MemberEntity findMember = memberRepository.findByUuidAndExpiredLike(uuid, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        int age = calculateAge(findMember.getBirth());
        MemberResponse memberResponse = MemberResponse.toDto(findMember, age);

        return responseUtil.buildSuccessResponse(memberResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<String> checkNicknameDuplicate(String nickname) {

        MemberEntity findMember = memberRepository.findByNicknameAndExpiredLike(nickname, "F");

        if(null != findMember){
            throw new CustomException(ErrorCode.DUPLICATE_NICKNAME);
        }
        return responseUtil.buildSuccessResponse("사용 가능한 닉네임입니다.");
    }

    public int calculateAge(String birth){
        LocalDate birthDate = LocalDate.parse(birth, DateTimeFormatter.BASIC_ISO_DATE);
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
