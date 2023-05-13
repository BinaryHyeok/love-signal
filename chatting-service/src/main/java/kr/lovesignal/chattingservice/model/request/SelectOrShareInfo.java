package kr.lovesignal.chattingservice.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@Builder
public class SelectOrShareInfo implements Serializable {

    private List<String> nicknames;
    private List<String> profileUrls;
    @Builder.Default
    private String selected = "F";

}
