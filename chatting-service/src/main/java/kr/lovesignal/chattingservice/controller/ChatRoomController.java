package kr.lovesignal.chattingservice.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import kr.lovesignal.chattingservice.model.request.ReqChatRoom;
import kr.lovesignal.chattingservice.model.request.ReqChatRoomInfo;
import kr.lovesignal.chattingservice.model.response.ResChatRoom;
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
    @GetMapping("/{roomId}")
    public ResponseEntity<ResChatRoom> getChatRoom(@PathVariable String roomUUID) {
        return new ResponseEntity<>(chatRoomService.getChatRoom(roomUUID), HttpStatus.OK);
    }


    /**
     * 채팅방 생성
     */
    @ApiOperation(value = "시스템 채팅방 생성", notes = "선택의 시간 때 사용할 시스템 채팅방 생성")
    @PostMapping("/SystemChatRoom/{userUUID}")
    public ResponseEntity<String> createSystemChatRoom(@RequestBody ReqChatRoom chatRoomDto, @PathVariable String userUUID){
        chatRoomService.createSystemChatroom(chatRoomDto, userUUID);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }

    @ApiOperation(value = "동성 및 혼성 채팅방 생성", notes = "동성 및 혼성 채팅방 생성 후 유저들 입장")
    @PostMapping("/SameAllGenderChatRoom")
    public ResponseEntity<String> createSameGenderChatRoom(@RequestBody ReqChatRoomInfo chatRoomInfoDto) {
        List<String> userUUIDs = chatRoomInfoDto.getUserUUIDs();
        ReqChatRoom chatRoomDto = chatRoomInfoDto.getChatRoomDto();
        chatRoomService.createSameGenderChatRoom(chatRoomDto, userUUIDs);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }

}
