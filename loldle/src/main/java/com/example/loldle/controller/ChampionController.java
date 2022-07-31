package com.example.loldle.controller;

import com.example.loldle.model.Champion;
import com.example.loldle.service.ChampionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/champion")
@RequiredArgsConstructor
@CrossOrigin
public class ChampionController {
    private final ChampionService championService;

    @GetMapping("/random")
    public Champion getRandomChampion(){
        return championService.getRandomChampion();
    }

    @GetMapping("/all")
    public List<Champion> getChampions(){
        return championService.getAllChampions();
    }

    @GetMapping("/get/{name}")
    public ResponseEntity<Champion> getChampionByName(@PathVariable("name")String name){
        if(championService.getChampionByName(name).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(championService.getChampionByName(name).get(), HttpStatus.ACCEPTED);
        //return championService.getChampionByName(name).get(),new ResponseStatus(200);
    }

    @GetMapping("/get/prefix/{prefix}")
    public List<Champion> getChampionWithPrefix(@PathVariable("prefix")String prefix){
        return championService.getChampionWithPrefix(prefix);
    }

    @PostMapping("/add")
    public Champion addChampion(@RequestBody Champion champion){
        return championService.addChampion(champion);
    }
}
