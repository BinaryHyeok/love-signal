package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.entity.MemberEntity;
import kr.lovesignal.memberservice.exception.CustomException;
import kr.lovesignal.memberservice.exception.ErrorCode;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import kr.lovesignal.memberservice.repository.MemberRepository;
import kr.lovesignal.memberservice.util.CommonUtils;
import kr.lovesignal.memberservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final ResponseUtils responseUtil;
    private final CommonUtils commonUtils;
    private final MemberRepository memberRepository;
    private final WebClient webClient;
    private final DiscoveryClient discoveryClient;

    @Value("${server.port}")
    private int port;

    // 멤버정보 수정
    @Override
    @Transactional
    public SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest) {

        UUID UUID = commonUtils.getValidUUID(updateMemberRequest.getMemberUUID());

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(UUID, "F")
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

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        findMember.setExpired("T");

        memberRepository.save(findMember);

        return responseUtil.buildSuccessResponse("삭제 되었습니다.");
    }

    // 멤버조회
    @Override
    @Transactional(readOnly = true)
    public MemberResponse getMemberByUUID(String memberUUID) {

        UUID UUID = commonUtils.getValidUUID(memberUUID);

        MemberEntity findMember = memberRepository.findByUUIDAndExpired(UUID, "F")
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        int age = commonUtils.calculateAge(findMember.getBirth());
        MemberResponse memberResponse = MemberResponse.toDto(findMember, age);

        return memberResponse;
    }

    @Override
    public Mono<MemberResponse> getProfileImageByMemberApi(MemberResponse memberResponse){
        String uri = "http://localhost:9010/file/profile";

        List<ServiceInstance> instances = discoveryClient.getInstances("file-service");
        if(instances == null || instances.isEmpty()){
            throw new CustomException(ErrorCode.SERVICE_NOT_FOUND);
        }
        else if(port == 0){
            uri = instances.get(0).getUri().toString() + "/file/profile";
        }

        return webClient.post()
                .uri(uri)
                .bodyValue(memberResponse)
                .retrieve()
                .bodyToMono(MemberResponse.class);
    }

    @Override
    public String getMemberByEmail(String email) {
        MemberEntity findMember = memberRepository.findByEmailAndExpired(email, "F");

        String memberUUID = null;
        if(findMember != null){
            memberUUID = findMember.getUUID().toString();
        }

        return memberUUID;
    }

    @Override
    public String registerMember(SignUpRequest signUpRequest) {

        MemberEntity saveMember = signUpRequest.toEntity();

        memberRepository.save(saveMember);

        return saveMember.getUUID().toString();
    }

    @Override
    public Boolean checkNicknameDuplicate(String nickname){
        MemberEntity findMember = memberRepository.findByNickname(nickname);

        return findMember == null ? true : false;
    }

}
