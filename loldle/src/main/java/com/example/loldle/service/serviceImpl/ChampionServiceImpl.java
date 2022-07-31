package com.example.loldle.service.serviceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.example.loldle.model.Champion;
import org.springframework.stereotype.Service;
import com.example.loldle.repository.ChampionRepository;
import com.example.loldle.service.ChampionService;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class ChampionServiceImpl implements ChampionService {
    private final ChampionRepository championRepository;

    @Override
    public Champion getRandomChampion() {
        int numberOfChampions = (int) championRepository.count();
        log.info("Number of champions: {}", numberOfChampions);
        Random rand = new Random();
        int randomId = rand.nextInt(numberOfChampions) + 1;
        log.info("Random id: {}", randomId);
        return championRepository.findById(randomId).get();
    }

    @Override
    public List<Champion> getAllChampions() {
        return championRepository.findAll();
    }

    @Override
    public Champion addChampion(Champion champion) {
        return championRepository.save(champion);
    }

    @Override
    public Optional<Champion> getChampionByName(String name) {
        return championRepository.findByName(name);
    }

    @Override
    public List<Champion> getChampionWithPrefix(String prefix) {
        return championRepository.findByNameStartingWith(prefix);
    }
}
