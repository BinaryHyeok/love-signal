package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import reactor.core.publisher.Mono;

public interface MemberService {

    SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest);

    void updateReceiveAlarm(String memberUUID, String status);

    SuccessResponse<String> deleteMember(String memberUUID);

    MemberResponse getMemberByUUID(String memberUUID);

    Mono<MemberResponse> getProfileImageByMemberApi(MemberResponse memberResponse);

    String getMemberByEmail(String email);

    String registerMember(SignUpRequest signUpRequest);

    Boolean checkNicknameDuplicate(String nickname);

}
