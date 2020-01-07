package com.geocoder.start.controllers;
import com.geocoder.start.entity.Note;
import com.geocoder.start.repos.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class ControllerMain {
    @Autowired
    private MessageRepo messageRepo;

    @GetMapping("/")
    public
    String greeting(Map<String, Object> model) {
        Iterable<Note> messages = messageRepo.findAll();
        model.put("messages", messages);
        return "index";
    }


    @PostMapping("/addAddress")
    public
    @ResponseBody
    String add(@RequestParam String text) {
        Note note = new Note(text);
        messageRepo.save(note);
        return "index";
    }

}