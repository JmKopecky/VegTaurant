package dev.prognitio.vegtaurant.data_storage;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

@Entity
public class FeaturedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int featuredPrecedence;
    private boolean isPercentageBased;
    private double discount;
    private String message;



    public static ArrayList<FeaturedItem> sort(ArrayList<FeaturedItem> items) {
        items.sort(Comparator.comparingInt(FeaturedItem::getFeaturedPrecedence));
        Collections.reverse(items);
        return items;
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public int getFeaturedPrecedence() {
        return featuredPrecedence;
    }
    public void setFeaturedPrecedence(int featuredPrecedence) {
        this.featuredPrecedence = featuredPrecedence;
    }
    public boolean isIsPercentageBased() {
        return isPercentageBased;
    }
    public void setIsPercentageBased(boolean dealType) {
        this.isPercentageBased = dealType;
    }
    public double getDiscount() {
        return discount;
    }
    public void setDiscount(double discount) {
        this.discount = discount;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
