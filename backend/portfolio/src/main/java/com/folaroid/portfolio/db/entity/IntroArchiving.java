package com.folaroid.portfolio.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class IntroArchiving {

    @Id @GeneratedValue
    //@Column(name = "intro_archiving_no")
    private Long introArchivingNo;

    private Long introNo;

    private String archivingName; // 사용자 관련 링크 이름
    private String archivingLink; // 사용자 관련 링크

}