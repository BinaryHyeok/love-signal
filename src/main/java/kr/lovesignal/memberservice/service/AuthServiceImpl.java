package kr.lovesignal.memberservice.service;

import kr.lovesignal.memberservice.model.request.DeleteMemberRequest;
import kr.lovesignal.memberservice.model.request.SignInRequest;
import kr.lovesignal.memberservice.model.request.SignUpRequest;
import kr.lovesignal.memberservice.model.request.UpdateMemberRequest;
import kr.lovesignal.memberservice.model.response.MemberResponse;
import kr.lovesignal.memberservice.model.response.SuccessResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    @Override
    @Transactional
    public SuccessResponse<String> registerMember(SignUpRequest signUpDto, HttpServletRequest request) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<Integer> authenticate(SignInRequest signInDto, HttpServletRequest request) {
        return null;
    }

    @Override
    @Transactional
    public SuccessResponse<String> updateMember(UpdateMemberRequest updateInfoDto, HttpServletRequest request) {
        return null;
    }

    @Override
    @Transactional
    public SuccessResponse<String> deleteMember(DeleteMemberRequest deleteDto, HttpServletRequest request) {
        return null;
    }

    @Override
    @Transactional(readOnly = true)
    public SuccessResponse<MemberResponse> getMemberById(Long memberId, HttpServletRequest request) {
        return null;
    }
}
