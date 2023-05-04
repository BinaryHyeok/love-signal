package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.entity.MemberEntity;
import kr.lovesignal.memberservice.exception.CustomException;
import kr.lovesignal.memberservice.exception.ErrorCode;
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
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.LinkedList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final ResponseUtils responseUtil;
    private final CommonUtils commonUtils;
    private final MemberRepository memberRepository;

    private final WebClient webClient;


    // 회원가입
    @Override
    @Transactional
    public String registerMember(SignUpRequest signUpRequest) {

        MemberEntity saveMember = signUpRequest.toEntity();

        memberRepository.save(saveMember);

        return saveMember.getUUID().toString();
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

        return responseUtil.buildSuccessResponse(findMember.getUUID().toString());
    }

    // 멤버정보 수정
    @Override
    @Transactional
    public SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest) {

        UUID UUID = commonUtils.getValidUUID(updateMemberRequest.getMemberUUID());

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        MemberEntity updateMember = updateMemberRequest.toEntity(findMember);

        memberRepository.save(updateMember);

        return responseUtil.buildSuccessResponse("수정 되었습니다.");
    }

    // 계정탈퇴
    @Override
    @Transactional
    public SuccessResponse<String> deleteMember(String strMemberUUID) {

        UUID UUID = commonUtils.getValidUUID(strMemberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        findMember.setExpired("T");

        memberRepository.save(findMember);

        return responseUtil.buildSuccessResponse("삭제 되었습니다.");
    }

    // 멤버조회
    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<MemberResponse> getMemberByUUID(String memberUUID) {

        UUID UUID = commonUtils.getValidUUID(memberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpiredLike(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        int age = commonUtils.calculateAge(findMember.getBirth());
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


    public void createSystemChatRoomApi(String strMemberUUID){
        String uri = "/chatRoom/System/" + strMemberUUID;
        webClient.post()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .subscribe();
    }
}
