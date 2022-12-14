package com.folaroid.portfolio.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Getter
public class PjtImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pjt_image_no")
    private Long pjtImageNo;

    private Long pjtNo;

    @Column(name = "pjt_image_location", length = 2083)
    private String pjtImageLocation;
    public void saveImage(Long pjtNo, String pjtImageLocation) {
        this.pjtNo = pjtNo;
        this.pjtImageLocation = pjtImageLocation;
    }

    public PjtImage(PjtImage pjtImage) {
        this.pjtNo = pjtImage.getPjtNo();
        this.pjtImageLocation = pjtImage.getPjtImageLocation();
    }

    public void savePjtNo(Long pjtNo) {
        this.pjtNo = pjtNo;
    }
}
