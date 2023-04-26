package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.model.request.DeleteMemberRequest;
import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;

import javax.servlet.http.HttpServletRequest;

public interface AuthService {

    public SuccessResponse<String> registerMember(SignUpRequest signUpDto, HttpServletRequest request);

    public SuccessResponse<Long> authenticate(SignInRequest signInDto, HttpServletRequest request);

    public SuccessResponse<String> updateMember(UpdateMemberRequest updateInfoDto, HttpServletRequest request);

    public SuccessResponse<String> deleteMember(DeleteMemberRequest deleteDto, HttpServletRequest request);

    public SuccessResponse<MemberResponse> getMemberById(Long memberId, HttpServletRequest request);

    public SuccessResponse<String> checkNicknameDuplicate(String nickname);

}
