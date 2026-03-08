package com.example.plantguard_ai.controller;

import com.example.plantguard_ai.dto.PlantResponse;
import com.example.plantguard_ai.service.PlantAnalysisService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/plants")
@CrossOrigin(origins = "http://localhost:8081")
public class PlantController {

    private final PlantAnalysisService service;

    public PlantController(PlantAnalysisService service) {
        this.service = service;
    }

    @PostMapping("/analyze")
    public PlantResponse analyzePlant(
            @RequestParam("file") MultipartFile file,
            Principal principal
    ) throws Exception {

        return service.analyzeAndSave(file, principal.getName());
    }
}
