package com.thefalseninepodcast.restapi.api;

import com.thefalseninepodcast.restapi.models.YoutubeLinks;
import com.thefalseninepodcast.restapi.repositories.YoutubeLinksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/youtube")
public class YoutubeLinksController {
    @Autowired
    private YoutubeLinksRepository repository;

    @GetMapping
    public List<YoutubeLinks> getAllYoutubeLinks(){
        return repository.findAll();
    }
}
