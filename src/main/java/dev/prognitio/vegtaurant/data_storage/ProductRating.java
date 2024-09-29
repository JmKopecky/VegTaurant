package dev.prognitio.vegtaurant.data_storage;

import jakarta.persistence.*;

@Entity
public class ProductRating {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @ManyToOne
    private Account reviewer;
    @ManyToOne
    private MenuItem product;
    private int rating;
    private String message;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public Account getReviewer() {
        return reviewer;
    }
    public void setReviewer(Account reviewer) {
        this.reviewer = reviewer;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public MenuItem getProduct() {
        return product;
    }
    public void setProduct(MenuItem product) {
        this.product = product;
    }
}
