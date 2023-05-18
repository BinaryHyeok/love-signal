package kr.lovesignal.fileservice.model.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class Team {

    private String teamUUID;
    private boolean haveMeetingTeam;
    private List<Member> members;


}
