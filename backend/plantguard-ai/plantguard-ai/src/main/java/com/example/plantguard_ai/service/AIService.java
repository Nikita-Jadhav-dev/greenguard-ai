//package com.example.plantguard_ai.service;
//
//import com.example.plantguard_ai.dto.PlantResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//
//@Service
//@RequiredArgsConstructor
//public class AIService {
//
//    private final WebClient.Builder webClientBuilder;
//
//    @Value("${ai.service.url}")
//    private String aiUrl;public AIService(WebClient.Builder webClientBuilder) {
//        this.webClientBuilder = webClientBuilder;
//    }
//
//    public PlantResponse analyzePlant(byte[] imageBytes) {
//
//        return webClientBuilder.build()
//                .post()
//                .uri(aiUrl)
//                .bodyValue(imageBytes)
//                .retrieve()
//                .bodyToMono(PlantResponse.class)
//                .block();
//    }
//}
package com.example.plantguard_ai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Service
public class AIService {

    @Autowired
    private RestTemplate restTemplate;

    private final String AI_API_URL = "http://localhost:8000/analyze";

    public String analyzePlant(MultipartFile file) {

        try {

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            ByteArrayResource fileResource =
                    new ByteArrayResource(file.getBytes()) {
                        @Override
                        public String getFilename() {
                            return file.getOriginalFilename();
                        }
                    };

            MultiValueMap<String,Object> body =
                    new LinkedMultiValueMap<>();

            body.add("file", fileResource);

            HttpEntity<MultiValueMap<String,Object>> requestEntity =
                    new HttpEntity<>(body,headers);

            ResponseEntity<String> response =
                    restTemplate.postForEntity(
                            AI_API_URL,
                            requestEntity,
                            String.class
                    );

            return response.getBody();

        } catch (Exception e) {
            throw new RuntimeException("AI Engine Error: " + e.getMessage());
        }
    }
}