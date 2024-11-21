package dev.prognitio.vegtaurant.json_models;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BatchReviewItem {

    private String name;
    private int value;
    private String message;

    public BatchReviewItem(@JsonProperty("name") String name, @JsonProperty("value") int value, @JsonProperty("message") String message) {
        this.name = name;
        this.value = value;
        this.message = message;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
