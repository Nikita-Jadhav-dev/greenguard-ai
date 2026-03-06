package com.example.plantguard_ai.dto;

public class PlantResponse {

    private String diseaseName;
    private double confidence;
    private String treatment;

    // No-Args Constructor
    public PlantResponse() {
    }

    // All-Args Constructor
    public PlantResponse(String diseaseName, double confidence, String treatment) {
        this.diseaseName = diseaseName;
        this.confidence = confidence;
        this.treatment = treatment;
    }

    // Getters and Setters

    public String getDiseaseName() {
        return diseaseName;
    }

    public void setDiseaseName(String diseaseName) {
        this.diseaseName = diseaseName;
    }

    public double getConfidence() {
        return confidence;
    }

    public void setConfidence(double confidence) {
        this.confidence = confidence;
    }

    public String getTreatment() {
        return treatment;
    }

    public void setTreatment(String treatment) {
        this.treatment = treatment;
    }

    public String getDisease()
    {

        return null;
    }
}