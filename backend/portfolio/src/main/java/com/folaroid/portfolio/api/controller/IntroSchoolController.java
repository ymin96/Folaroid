package com.folaroid.portfolio.api.controller;

import com.folaroid.portfolio.api.dto.IntroSchoolDto;
import com.folaroid.portfolio.api.service.IntroSchoolService;
import com.folaroid.portfolio.db.entity.IntroSchool;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "자기소개 학력내역", tags={"IntroSchool"})
@RequestMapping("/intro-school")
@RequiredArgsConstructor
@RestController
public class IntroSchoolController {
    private final IntroSchoolService introSchoolService;

    /**
     * 마이페이지 - 학력내역 등록
     */
    @PostMapping
    @ApiOperation(value = "마이페이지 - 학력 등록", notes = "마이페이지 - 학력내역을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Long> saveIntroSchool(@RequestBody IntroSchoolDto.introSchoolRequest introSchoolRequest){
        Long introSchoolNo = introSchoolService.saveIntroSchool(introSchoolRequest);
        return new ResponseEntity<>(introSchoolNo, HttpStatus.OK);
    }

    /**
     * 마이페이지 - 학력내역 삭제
     */
    @DeleteMapping("{introSchoolNo}")
    @ApiOperation(value = "마이페이지 - 학력 삭제", notes = "마이페이지 - 학력 내역을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> deleteIntroSchool(@PathVariable Long introSchoolNo){
        introSchoolService.deleteIntroSchool(introSchoolNo);
        return ResponseEntity.status(200).body(introSchoolNo);
    }
    /**
     * 마이페이지 - 학력 조회
     */
    @GetMapping("{introNo}")
    @ApiOperation(value = "마이페이지 - 학력 조회", notes = "마이페이지 - 학력 내역을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<IntroSchool>> findIntroSchool(@PathVariable("introNo")Long introNo){
        List<IntroSchool> introSchools = introSchoolService.findIntroSchool(introNo);
        return new ResponseEntity<>(introSchools, HttpStatus.OK);
    }
}
