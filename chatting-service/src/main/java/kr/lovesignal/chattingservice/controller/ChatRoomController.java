package kr.lovesignal.chattingservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.chattingservice.model.request.ReqSelectInfo;
import kr.lovesignal.chattingservice.model.response.ResChatRoom;
import kr.lovesignal.chattingservice.model.response.ResEnterChatRoom;
import kr.lovesignal.chattingservice.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = "채팅방")
@RequiredArgsConstructor
@RestController
@RequestMapping("/chatRoom")
public class ChatRoomController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ChatRoomService chatRoomService;

    /**
     * 채팅방 조회
     */
    @ApiOperation(value = "해당 멤버의 모든 채팅방 조회", notes = "해당 멤버의 UUID로 입당되어 있는 모든 채팅방을 불러온다.")
    @GetMapping("/{userUUID}")
    public ResponseEntity<List<ResChatRoom>> getChatRoomList(@PathVariable String userUUID){
        return new ResponseEntity<>(chatRoomService.getChatRoomList(userUUID), HttpStatus.OK);
    }

    @ApiOperation(value = "채팅방 상세 조회", notes = "채팅방에 입장했을 때 채팅방 불러오기")
    @GetMapping("/detail/{roomUUID}")
    public ResponseEntity<ResEnterChatRoom> getChatRoom(@PathVariable String roomUUID) {
        return new ResponseEntity<>(chatRoomService.getChatRoom(roomUUID), HttpStatus.OK);
    }


    /**
     * 채팅방 생성
     */
    @ApiOperation(value = "시스템 채팅방 생성", notes = "선택의 시간 때 사용할 시스템 채팅방 생성")
    @PostMapping("/System/{userUUID}")
    public ResponseEntity<String> createSystemChatRoom(@PathVariable String userUUID){
        chatRoomService.createSystemChatroom(userUUID);
        return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);
    }

    @ApiOperation(value = "동성 및 혼성 채팅방 생성", notes = "동성 및 혼성 채팅방 생성 후 유저들 입장")
    @PostMapping("/SameOrAllGender")
    public ResponseEntity<String> createSameOrAllGenderChatRoom(@RequestBody List<String> memberUUIDs) {
        List<String> userUUIDs = memberUUIDs;
        chatRoomService.createSameOrAllGenderChatRoom(memberUUIDs);
        return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);
    }

    @ApiOperation(value = "이성지목 1:1 채팅방 생성", notes = "이성을 지목하여 익명 혹은 영구 1:1 채팅방이 생성된다.")
    @PostMapping("/OneToOne")
    public ResponseEntity<String> createSelectChatRoom(@RequestBody ReqSelectInfo reqSelectInfo) {
        String selectorUUID = reqSelectInfo.getSelectorUUID();
        String selectedUUID = reqSelectInfo.getSelectedUUID();
        chatRoomService.createOneToOneChatRoom(selectorUUID, selectedUUID);
        return new ResponseEntity<>(SUCCESS, HttpStatus.CREATED);
    }

    /**
     * 채팅방 나가기
     */
    @ApiOperation(value = "채팅방 나가기", notes = "채팅방을 만료시켜서 목록에서 제거한다.")
    @PutMapping("/exit")
    public ResponseEntity<String> exitChatRoom(@RequestBody List<String> memberUUIDs) {
        System.out.println("======================================================");
        System.out.println("여기는 채팅방 나가기 API 입니당");
        for(String uuid : memberUUIDs) {
            System.out.println(uuid);
        }
        chatRoomService.exitChatRoom(memberUUIDs);
        return new ResponseEntity<>(SUCCESS, HttpStatus.OK);
    }


}
