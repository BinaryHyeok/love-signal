package kr.lovesignal.authservice.service;

import kr.lovesignal.authservice.exception.CustomException;
import kr.lovesignal.authservice.exception.ErrorCode;
import kr.lovesignal.authservice.model.request.SignUpRequest;
import kr.lovesignal.authservice.model.response.*;
import kr.lovesignal.authservice.util.ResponseUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final ResponseUtils responseUtils;
    private final WebClientService webClientService;

    /**
     * 회원가입 요청을 받아 member service로 등록을 요청을 보낸 후 등록한 멤버의 UUID를 반환한다.
     * @param signUpRequest
     * @param accessToken
     * @return 등록한 유저의 UUID
     */
    @Override
    @Transactional
    public String registerMember(SignUpRequest signUpRequest, String accessToken) {

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(accessToken).block();

        signUpRequest.setEmail(kauthAccountResponse.getKakao_account().getEmail());
        signUpRequest.setKakaoId(kauthAccountResponse.getId().toString());

        String memberUUID = webClientService.registerMember(signUpRequest).block();

        return memberUUID;
    }

    /**
     * 인증코드로 해당 유저의 카카오 토큰들을 받급받고, 로그인 처리한다.
     * 서비스에 가입된 유저가 아닌 경우 memberUUID의 값는 null이다.
     * @param authorizationCode
     * @return 토큰정보들과 유저의 UUID, kakaoID
     */
    @Override
    public SuccessResponse<SignInResponse> signIn(String authorizationCode) {

        KauthTokenResponse kauthTokenResponse =
                webClientService.getKakaoTokenApi(authorizationCode).block();

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(kauthTokenResponse.getAccess_token()).block();

        String memberUUID = webClientService.getMemberUUID(kauthAccountResponse.getKakao_account().getEmail()).block();

        int accessTokenExpireTime = kauthTokenResponse.getExpires_in() != null ?
                kauthTokenResponse.getExpires_in().intValue() : 0;
        int refreshTokenExpireTime = kauthTokenResponse.getRefresh_token_expires_in() != null ?
                kauthTokenResponse.getRefresh_token_expires_in().intValue() : 0;

        SignInResponse signInResponse = SignInResponse.builder()
                .memberUUID(memberUUID)
                .kakaoId(kauthAccountResponse.getId().toString())
                .accessToken(kauthTokenResponse.getAccess_token())
                .accessTokenExpireTime(accessTokenExpireTime)
                .refreshToken(kauthTokenResponse.getRefresh_token())
                .refreshTokenExpireTime(refreshTokenExpireTime)
                .build();

        return responseUtils.buildSuccessResponse(signInResponse);
    }

    /**
     * 닉네임 중복 확인을 한다. 중복된 닉네임이라면 409에러를 반환
     * @param nickname
     * @return 완료 문장
     */
    @Override
    public SuccessResponse<String> checkNicknameDuplicate(String nickname) {

       Boolean isPossibleNickname = webClientService.validateNickname(nickname).block();

        if(!isPossibleNickname){
            throw new CustomException(ErrorCode.DUPLICATE_NICKNAME);
        }
        return responseUtils.buildSuccessResponse("사용 가능한 닉네임입니다.");
    }

    /**
     * 리프레쉬 토큰으로 액세스토큰 재발급, 리프레쉬가 재발급이 안된다면 null
     * @param refreshToken
     * @return 새로운 토큰 값 반환
     */
    @Override
    public SuccessResponse<SignInResponse> makeRefreshResponse(String refreshToken) {

        KauthTokenResponse kauthTokenResponse = webClientService.refreshKakaoTokenApi(refreshToken).block();

        KauthAccountResponse kauthAccountResponse =
                webClientService.getKakaoAccountApi(kauthTokenResponse.getAccess_token()).block();

        String memberUUID = webClientService.getMemberUUID(kauthAccountResponse.getKakao_account().getEmail()).block();

        int accessTokenExpireTime = kauthTokenResponse.getExpires_in() != null ?
                kauthTokenResponse.getExpires_in().intValue() : 0;
        int refreshTokenExpireTime = kauthTokenResponse.getRefresh_token_expires_in() != null ?
                kauthTokenResponse.getRefresh_token_expires_in().intValue() : 0;

        SignInResponse refreshResponse = SignInResponse.builder()
                .accessToken(kauthTokenResponse.getAccess_token())
                .kakaoId(kauthAccountResponse.getId().toString())
                .accessTokenExpireTime(accessTokenExpireTime)
                .refreshToken(kauthTokenResponse.getRefresh_token())
                .refreshTokenExpireTime(refreshTokenExpireTime)
                .memberUUID(memberUUID)
                .build();

        return responseUtils.buildSuccessResponse(refreshResponse);
    }


}
