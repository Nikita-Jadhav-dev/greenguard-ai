package com.example.plantguard_ai.service;

import com.example.plantguard_ai.dto.PlantResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class AIService {

    private final WebClient.Builder webClientBuilder;

    @Value("${ai.service.url}")
    private String aiUrl;public AIService(WebClient.Builder webClientBuilder) {
        this.webClientBuilder = webClientBuilder;
    }

    public PlantResponse analyzePlant(byte[] imageBytes) {

        return webClientBuilder.build()
                .post()
                .uri(aiUrl)
                .bodyValue(imageBytes)
                .retrieve()
                .bodyToMono(PlantResponse.class)
                .block();
    }
}