package kr.lovesignal.memberservice.util;

import kr.lovesignal.memberservice.exception.CustomException;
import kr.lovesignal.memberservice.exception.ErrorCode;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class CommonUtils {

    public UUID getValidUUID(String uuidRequest){
        try{
            UUID uuid = UUID.fromString(uuidRequest);
            return uuid;
        }
        catch (IllegalArgumentException e){
            throw new CustomException(ErrorCode.INVALID_UUID);
        }
    }
}
