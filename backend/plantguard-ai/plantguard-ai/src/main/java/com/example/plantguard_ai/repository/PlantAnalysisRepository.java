package com.example.plantguard_ai.repository;

import com.example.plantguard_ai.entity.PlantAnalysis;
import com.example.plantguard_ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlantAnalysisRepository extends JpaRepository<PlantAnalysis, Long>
{

    List<PlantAnalysis> findByUser(User user);

    //<T> Optional<T> findByUsername(String username);
}