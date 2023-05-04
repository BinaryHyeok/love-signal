package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;

import java.util.UUID;

public interface AuthService {

    public String registerMember(SignUpRequest signUpRequest);

    public SuccessResponse<Long> authenticate(SignInRequest signInRequest);

    public SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest);

    public SuccessResponse<String> deleteMember(String memberUUID);

    public SuccessResponse<MemberResponse> getMemberByUUID(String memberUUID);

    public SuccessResponse<String> checkNicknameDuplicate(String nickname);

    public void createSystemChatRoomApi(String strMemberUUID);

}
