package com.example.loldle.service;

import com.example.loldle.model.Champion;

import java.util.List;
import java.util.Optional;

public interface ChampionService {
    Champion getRandomChampion();
    List<Champion> getAllChampions();
    Champion addChampion(Champion champion);
    Optional<Champion> getChampionByName(String name);

    List<Champion> getChampionWithPrefix(String prefix);
}
