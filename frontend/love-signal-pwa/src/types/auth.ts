// memberUUID //회원가입 안된사람이면 null 값
// kakaoUUID //카카오 UUID //recoil 저장
// accessToken //AccessToken //recoil 저장
// accessTokenExpireTime // AcessToken 만료시간 //recoil 저장
// refreshToken //리프레시 토큰 //쿠키 저장

export type kakao = {
  memberUUID: string;
  kakaoUUID: string;
  accessToken: string;
  accessTokenExpireTime: number;
  refreshToken: string;
};
