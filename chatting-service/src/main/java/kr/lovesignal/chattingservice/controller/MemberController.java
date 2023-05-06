package kr.lovesignal.chattingservice.controller;

import kr.lovesignal.chattingservice.entity.Member;
import kr.lovesignal.chattingservice.repository.MemberJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/test")
public class MemberController {

    private MemberJpaRepository memberJpaRepository;

    @GetMapping("/{userId}")
    public ResponseEntity<Member> getMember(@PathVariable String userId) {
        Optional<Member> member = memberJpaRepository.findById(Long.parseLong(userId));
        return new ResponseEntity<>(member.get(), HttpStatus.OK);
    }

}
