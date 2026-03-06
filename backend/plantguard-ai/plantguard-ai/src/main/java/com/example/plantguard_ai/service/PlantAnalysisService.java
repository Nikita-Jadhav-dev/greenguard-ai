package com.example.plantguard_ai.service;

import com.example.plantguard_ai.dto.PlantResponse;
import com.example.plantguard_ai.entity.PlantAnalysis;
import com.example.plantguard_ai.repository.PlantAnalysisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;

import java.io.File;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PlantAnalysisService {

    private final AIService aiService;
    private final PlantAnalysisRepository repository;

    private final RestTemplate restTemplate = new RestTemplate();
    public PlantAnalysisService(AIService aiService, PlantAnalysisRepository repository) {
        this.aiService = aiService;
        this.repository = repository;
    }

    public PlantResponse analyzeAndSave(MultipartFile file, String username) throws Exception {

        // 1️⃣ Save image locally
        String uploadDir = "uploads/";
        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String filePath = uploadDir + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // 2️⃣ Send image to FastAPI
        String fastApiUrl = "http://localhost:8000/predict";

        PlantResponse response =
                restTemplate.postForObject(fastApiUrl, file, PlantResponse.class);

        // 3️⃣ Save result in database
        PlantAnalysis analysis = new PlantAnalysis();

        analysis.setImagePath(filePath);
        analysis.setDiseaseName(response.getDisease());
        analysis.setConfidence(response.getConfidence());
        analysis.setTreatment(response.getTreatment());
        analysis.setCreatedAt(LocalDateTime.now());
        //analysis.setUserId(1L);

        repository.save(analysis);

        return response;
    }
}