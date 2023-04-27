package kr.lovesignal.chattingservice.controller;

import kr.lovesignal.chattingservice.entity.ChatRoom;
import kr.lovesignal.chattingservice.model.ChatRoomDto;
import kr.lovesignal.chattingservice.model.ChatRoomInfoDto;
import kr.lovesignal.chattingservice.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/chatRoom")
public class doChatRoomController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ChatRoomService chatRoomService;

    @GetMapping("/{userUUID}")
    public ResponseEntity<List<ChatRoom>> chatRoomList(@PathVariable String userUUID){
        return new ResponseEntity<>(chatRoomService.getChatRoomList(userUUID), HttpStatus.OK);
    }

    @PostMapping("/SystemChatRoom/{userUUID}")
    public ResponseEntity<String> createSystemChatRoom(@RequestBody ChatRoomDto chatRoomDto, @PathVariable String userUUID){
        chatRoomService.createSystemChatroom(chatRoomDto, userUUID);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }

    @PostMapping("/SameAllGenderChatRoom")
    public ResponseEntity<String> createSameGenderChatRoom(@RequestBody ChatRoomInfoDto chatRoomInfoDto) {
        List<String> userUUIDs = chatRoomInfoDto.getUserUUIDs();
        ChatRoomDto chatRoomDto = chatRoomInfoDto.getChatRoomDto();
        chatRoomService.createSameGenderChatRoom(chatRoomDto, userUUIDs);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }

}
