package kr.lovesignal.chattingservice.util;


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
            System.out.println(e);
            return null;
        }
    }

}
