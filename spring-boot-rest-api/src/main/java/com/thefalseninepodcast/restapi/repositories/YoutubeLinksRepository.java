package com.thefalseninepodcast.restapi.repositories;

import com.thefalseninepodcast.restapi.models.YoutubeLinks;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface YoutubeLinksRepository extends MongoRepository<YoutubeLinks, String> {

}
