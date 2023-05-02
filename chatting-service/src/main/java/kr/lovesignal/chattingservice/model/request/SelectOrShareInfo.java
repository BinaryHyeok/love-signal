package kr.lovesignal.chattingservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class SelectOrShareInfo {

    /*
        이성지목 메세지를 완료로 업데이트
        roomUUID
        chatUUID

        이성지목 결과 메세지 저장
        roomUUID
        나의 UUID
        상대방의 nickname
        ( 상대방의 profileUrl )
     */

    private List<String> nicknames;
    private List<String> profileUrls;
    @Builder.Default
    private String selected = "F";

}
