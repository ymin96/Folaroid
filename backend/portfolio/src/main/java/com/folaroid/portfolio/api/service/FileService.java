package com.folaroid.portfolio.api.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.folaroid.portfolio.db.entity.IntroImage;
import com.folaroid.portfolio.db.entity.PjtImage;
import com.folaroid.portfolio.db.entity.Project;
import com.folaroid.portfolio.db.repository.IntroImageRepository;
import com.folaroid.portfolio.db.repository.PjtImageRepository;
import com.folaroid.portfolio.db.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class FileService {

    private final PjtImageRepository pjtImageRepository;
    private final IntroImageRepository introImageRepository;
    private final ProjectRepository projectRepository;

    private AmazonS3 amazonS3;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @PostConstruct
    public void amazonS3Client() {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKey, secretKey);
        amazonS3= AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }

    @Transactional
    public List<String> uploadImages(Long pjtNo, List<MultipartFile> multipartFile) throws IOException {
        List<String> urlList = new ArrayList<>();

        //?????????
        List<PjtImage> pjtImages = pjtImageRepository.findAllByPjtNo(pjtNo);
        pjtImages.forEach(pjtImage -> {
            deleteFile(pjtImage.getPjtImageLocation());
            pjtImageRepository.delete(pjtImage);
        });

        //??????
        multipartFile.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());
            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "?????? ???????????? ??????????????????.");
            }
            PjtImage pjtImage = new PjtImage();
            //?????? ???????????? ???????????? ??????
            String url = FileNameToUrl(fileName);
            pjtImage.saveImage(pjtNo, url);
            pjtImageRepository.save(pjtImage);
            urlList.add(url);
        });

        return urlList;
    }

    @Transactional
    public String uploadProjectOneImage(Long pjtNo, MultipartFile multipartFile) throws IOException {
        //?????????
        Project project = projectRepository.findById(pjtNo).orElseThrow(() -> new IllegalAccessError("?????? ???????????? ?????????."));;
        deleteFile(project.getPjtOneImageLocation());

        //??????
        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "?????? ???????????? ??????????????????.");
        }
        //?????? ???????????? ???????????? ??????
        String url = FileNameToUrl(fileName);
        project.updateImage(url);

        return url;
    }


    @Transactional
    public String introImageUploadImage(Long introNo, MultipartFile multipartFile) throws IOException {
        //?????????
        IntroImage introImage = introImageRepository.findByIntroNo(introNo);
        deleteFile(introImage.getIntroImageLocation());

        //??????
        String fileName = createFileName(multipartFile.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(multipartFile.getSize());
        objectMetadata.setContentType(multipartFile.getContentType());

        try(InputStream inputStream = multipartFile.getInputStream()) {
            amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch(IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "?????? ???????????? ??????????????????.");
        }
        //?????? ???????????? ???????????? ??????
        String url = FileNameToUrl(fileName);
        introImage.IntroImageLocationSave(url);

        return url;
    }

    public void deleteFile(String url) {
        String fileName = UrlToFileName(url);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String FileNameToUrl(String fileName) {
        return "https://" + bucket + ".s3." + region + ".amazonaws.com/" + fileName;
    }

    private String UrlToFileName(String url) {
        String fileName = url;
        for (int i = url.length() - 1 ; i >= 0 ; i--) {
            if (url.charAt(i) == '/') {
                fileName = url.substring(i+1);
                break;
            }
        }
        return fileName;
    }

    private String createFileName(String fileName) { // ?????? ?????? ????????? ???, ???????????? ??????????????? ?????? random?????? ????????????.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "????????? ????????? ??????(" + fileName + ") ?????????.");
        }
    }

    public void deleteProjectOneImageLocation(Long pjtNo) {
        Project project = projectRepository.findById(pjtNo).orElseThrow(()->
                new IllegalArgumentException("???????????? ??????????????? ???????????? ????????????."));
        deleteFile(project.getPjtOneImageLocation());
        project.updateImage("");
    }
    @Transactional
    public String duplicateImage(String introImageLocation) {
        //?????? ???????????? ????????????
        if (introImageLocation.contains("githubusercontent")){
            return introImageLocation;
        }

        String fileName = UrlToFileName(introImageLocation);
        String NewFileName = createFileName(fileName);
        try {
            //Copy ?????? ??????
            CopyObjectRequest copyObjRequest = new CopyObjectRequest(bucket, fileName, bucket, NewFileName);
            //Copy
            amazonS3.copyObject(copyObjRequest); // this.
        } catch (AmazonServiceException e) {
            e.printStackTrace();
        } catch (SdkClientException e) {
            e.printStackTrace();
        }
        return FileNameToUrl(NewFileName);
    }
}