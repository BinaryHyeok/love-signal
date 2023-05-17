package kr.lovesignal.teamservice.util;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtils {

    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${redis-key.block-user}")
    private String blockUser;

    @Value("${redis-key.matching-male-user}")
    private String matchingMaleUser;

    @Value("${redis-key.matching-male-waiting}")
    private String matchingMaleWaiting;

    @Value("${redis-key.matching-female-user}")
    private String matchingFemaleUser;

    @Value("${redis-key.matching-female-waiting}")
    private String matchingFemaleWaiting;

    @Value("${redis-key.recent-teams}")
    private String recentTeam;

    public void addBlockUser(String key, int expireTime){
        redisTemplate.opsForValue().set(blockUser + "_" + key, key, expireTime, TimeUnit.SECONDS);
    }

    public boolean hasBlockUser(String key){
        return redisTemplate.hasKey(blockUser + "_" + key);
    }

    public void removeBlockUser(String key){
        redisTemplate.delete(blockUser + "_" + key);
    }

    public long getExpireTimeOfBlockUser(String key) {
        return redisTemplate.getExpire(blockUser + "_" + key);
    }

    public void addRecentTeam(String key, int expireTime){
        redisTemplate.opsForValue().set(recentTeam + "_" + key, key, expireTime, TimeUnit.SECONDS);
    }

    public boolean hasRecentTeam(String key){
        return redisTemplate.hasKey(recentTeam + "_" + key);
    }

    public void addMatchingUser(String value, String gender){
        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
        redisTemplate.opsForSet().add(key, value);
    }

    public boolean hasMatchingUser(String value, String gender){
        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
        return redisTemplate.opsForSet().isMember(key, value);
    }

    public void removeMatchingUser(String value, String gender){
        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
        redisTemplate.opsForSet().remove(key, value);
    }

    public int getMatchingUserSize(String gender){
        String key = "M".equals(gender) ? matchingMaleUser : matchingFemaleUser;
        Long size = redisTemplate.opsForSet().size(key);
        return size == null ? 0 : size.intValue();
    }

    public void pushMatchingWaiting(String value, String gender){
        String key = "M".equals(gender) ? matchingMaleWaiting : matchingFemaleWaiting;
        redisTemplate.opsForList().rightPush(key, value);
    }

    public String popMatchingWaiting(String gender){
        String key = "M".equals(gender) ? matchingMaleWaiting : matchingFemaleWaiting;
        return (String)redisTemplate.opsForList().leftPop(key);
    }

}
