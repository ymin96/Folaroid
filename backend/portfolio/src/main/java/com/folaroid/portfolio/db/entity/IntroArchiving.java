package com.folaroid.portfolio.db.entity;

import lombok.*;
import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
@Builder
public class IntroArchiving {

    @Id @GeneratedValue
    //@Column(name = "intro_archiving_no")
    private Long introArchivingNo;

//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "intro_no")
    private Long introNo;

    private String archivingName; // 사용자 관련 링크 이름
    private String archivingLink; // 사용자 관련 링크

    public IntroArchiving(Long introNo) {
        this.introNo = introNo;
    }

    public void saveOtherData(String archivingName, String archivingLink) {
        this.archivingName = archivingName;
        this.archivingLink = archivingLink;
    }
}
