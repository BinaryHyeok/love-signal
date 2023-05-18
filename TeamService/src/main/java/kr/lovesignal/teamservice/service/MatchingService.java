package kr.lovesignal.teamservice.service;

public interface MatchingService {

    Long addTeamMatching(String strMemberUUID);

    void cancelTeamMatching(String strMemberUUID);

}
