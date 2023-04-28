package kr.lovesignal.teamservice.util;

import kr.lovesignal.teamservice.exception.CustomException;
import kr.lovesignal.teamservice.exception.ErrorCode;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
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

    public int calculateAge(String birth){
        LocalDate birthDate = LocalDate.parse(birth, DateTimeFormatter.BASIC_ISO_DATE);
        return Period.between(birthDate, LocalDate.now()).getYears();
    }
}
