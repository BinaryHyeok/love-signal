package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.model.request.DeleteMemberRequest;
import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;

import javax.servlet.http.HttpServletRequest;

public interface AuthService {

    public SuccessResponse<String> registerMember(SignUpRequest signUpRequest);

    public SuccessResponse<Long> authenticate(SignInRequest signInRequest);

    public SuccessResponse<String> updateMember(UpdateMemberRequest updateMemberRequest);

    public SuccessResponse<String> deleteMember(DeleteMemberRequest deleteMemberRequest);

    public SuccessResponse<MemberResponse> getMemberById(String uuid);

    public SuccessResponse<String> checkNicknameDuplicate(String nickname);

}
