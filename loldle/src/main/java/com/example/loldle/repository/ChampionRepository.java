package com.example.loldle.repository;

import com.example.loldle.model.Champion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChampionRepository extends JpaRepository<Champion, Integer> {
    Optional<Champion> findByName(String name);
    List<Champion> findByNameStartingWith(String prefix);
}
