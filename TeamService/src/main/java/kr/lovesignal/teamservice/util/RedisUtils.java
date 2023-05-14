//package kr.lovesignal.teamservice.util;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import java.util.concurrent.TimeUnit;
//
//@Component
//@RequiredArgsConstructor
//public class RedisUtils {
//
//    private final RedisTemplate<String, Object> redisTemplate;
//
//    @Value("${redis-key.block-user}")
//    private String blockUser;
//
//    @Value("${redis-key.matching-male-user}")
//    private String matchingMaleUser;
//
//    @Value("${redis-key.matching-male-waiting}")
//    private String matchingMaleWaiting;
//
//    @Value("${redis-key.matching-female-user}")
//    private String matchingFemaleUser;
//
//    @Value("${redis-key.matching-female-waiting}")
//    private String matchingFemaleWaiting;
//
//    @Value("${redis-key.recent-teams}")
//    private String recentTeam;
//
//    public void addBlockUser(String hashKey, int expireTime){
//        String expireKey = blockUser + ":" + hashKey;
//        redisTemplate.opsForHash().put(blockUser, hashKey,true);
//        redisTemplate.expire(expireKey, expireTime, TimeUnit.SECONDS);
//    }
//
//    public boolean hasBlockUser(String hashKey){
//        return redisTemplate.opsForHash().hasKey(blockUser, hashKey);
//    }
//
//    public void addMatchingUser(String value, String gender){
//        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
//        redisTemplate.opsForSet().add(key, value);
//    }
//
//    public boolean hasMatchingUser(String value, String gender){
//        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
//        return redisTemplate.opsForSet().isMember(key, value);
//    }
//
//    public void removeMatchingUser(String value, String gender){
//        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
//        redisTemplate.opsForSet().remove(key, value);
//    }
//
//    public int getMatchingUserSize(String gender){
//        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
//        return redisTemplate.opsForSet().size(key).intValue();
//    }
//
//    public void pushMatchingWaiting(String value, String gender){
//        String key = "M".equals(gender) ? matchingMaleWaiting : matchingFemaleWaiting;
//        redisTemplate.opsForList().rightPush(key, value);
//    }
//
//    public String popMatchingWaiting(String gender){
//        String key = "M".equals(gender) ? matchingMaleWaiting : matchingFemaleWaiting;
//        return (String)redisTemplate.opsForList().leftPop(key);
//    }
//
//    public void addRecentTeam(String hashKey, int expireTime){
//        String expireKey = recentTeam + ":" + hashKey;
//        redisTemplate.opsForHash().put(recentTeam, hashKey,true);
//        redisTemplate.expire(expireKey, expireTime, TimeUnit.SECONDS);
//    }
//
//    public boolean hasRecentTeam(String hashKey){
//        return redisTemplate.opsForHash().hasKey(recentTeam, hashKey);
//    }
//}
