package kr.lovesignal.teamservice.model.request;

import lombok.Getter;

import java.util.List;

@Getter
public class GetOppositeGenderTeamsRequest {

    private List<String> teamUUIDList;

}
