package kr.lovesignal.teamservice.service;

public interface MatchingService {

    void addTeamMatching(String strMemberUUID);

    void cancelTeamMatching(String strMemberUUID);

}
