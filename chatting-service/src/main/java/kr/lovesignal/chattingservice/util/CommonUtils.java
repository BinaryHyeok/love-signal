package kr.lovesignal.chattingservice.util;


import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.UUID;

@Component
public class CommonUtils {
    String[] animals = {"몽구스","고양이","강아지","토끼","햄스터","고슴도치",
            "야옹이","너구리","라쿤","알파카","펠리컨","캥거루","사막여우","구미호",
            "아기새","참새","다람쥐","호랑이","황제펭귄","펭귄","날다람쥐","족제비",
            "아기곰","코알라","판다","미어캣","병아리","수달","쿼카","우파루파","비둘기"};

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

    public String getAnimal() {
        Random random = new Random();
        int number = random.nextInt(animals.length);
        return animals[number];
    }

}
