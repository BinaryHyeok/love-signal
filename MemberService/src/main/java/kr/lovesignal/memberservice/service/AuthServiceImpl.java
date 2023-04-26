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
import kr.lovesignal.memberservice.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;

    // 회원가입
    @Override
    @Transactional
    public SuccessResponse<String> registerMember(SignUpRequest signUpDto, HttpServletRequest request) {

        MemberEntity saveMember = signUpDto.toEntity();

        memberRepository.save(saveMember);

        return responseUtil.buildSuccessResponse("회원가입 되었습니다.");
    }

    // 로그인
    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<Long> authenticate(SignInRequest signInDto, HttpServletRequest request) {

        MemberEntity findMember = memberRepository.findByLoginIdAndExpiredLike(signInDto.getLoginId(), "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!findMember.getPassword().equals(signInDto.getPassword())){
            throw new CustomException(ErrorCode.INVALID_PASSWORD);
        }

        return responseUtil.buildSuccessResponse(findMember.getMemberId());
    }

    // 멤버정보 수정
    @Override
    @Transactional
    public SuccessResponse<String> updateMember(UpdateMemberRequest updateDto, HttpServletRequest request) {

        MemberEntity findMember = memberRepository.findByMemberIdAndExpiredLike(updateDto.getMemberId(), "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MemberEntity updateMember = updateDto.toEntity(findMember);

        memberRepository.save(updateMember);

        return responseUtil.buildSuccessResponse("수정 되었습니다.");
    }

    // 계정탈퇴
    @Override
    @Transactional
    public SuccessResponse<String> deleteMember(DeleteMemberRequest deleteDto, HttpServletRequest request) {

        MemberEntity findMember = memberRepository.findByMemberIdAndExpiredLike(deleteDto.getMemberId(), "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MemberEntity deleteMember = markAsExpired(findMember);

        memberRepository.save(deleteMember);

        return responseUtil.buildSuccessResponse("삭제 되었습니다.");
    }

    // 멤버조회
    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<MemberResponse> getMemberById(Long memberId, HttpServletRequest request) {

        MemberEntity findMember = memberRepository.findByMemberIdAndExpiredLike(memberId, "F")
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

    public MemberEntity markAsExpired(MemberEntity member){
        member.setExpired("T");
        return member;
    }

    public int calculateAge(String birth){
        LocalDate birthDate = LocalDate.parse(birth, DateTimeFormatter.BASIC_ISO_DATE);
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
