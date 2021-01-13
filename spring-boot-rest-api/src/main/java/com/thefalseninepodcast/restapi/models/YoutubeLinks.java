package com.thefalseninepodcast.restapi.models;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "youtubelinks")
public class YoutubeLinks {

    @Id
    public ObjectId _id;
    public String title;
    public String id;
    public Object date;

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Object getDate() {
        return date;
    }

    public void setDate(Object date) {
        this.date = date;
    }

    public YoutubeLinks(ObjectId _id, String title, String id, String date) {
        this._id = _id;
        this.title = title;
        this.id = id;
        this.date = date;
    }
}
