package dev.prognitio.vegtaurant.data_storage;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.Comparator;

@Entity
public class MenuItem {

    @Id
    private String label;
    private String description;
    private String iconUrl;
    private Double price;
    @Column(name = "average_rating")
    private Double averagerating;
    @Column(name = "total_ratings")
    private Integer totalratings;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MenuCategory category;
    private String tag; //used as a sublevel menu, but optional
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private FeaturedItem deal;



    public static void sort(ArrayList<MenuItem> items, String sortBy) {
        switch (sortBy) {
            case "label" -> {
                items.sort(Comparator.comparing(MenuItem::getLabel));
            }
            case "price" -> {
                items.sort(Comparator.comparing(MenuItem::getPrice));
            }
            case "rating" -> { //implementing bayesian average here
                items.sort(Comparator.comparing(MenuItem::getTotalratings));
                final double cVal = items.get(items.size() / 4).totalratings;
                double totalRatings = 0;
                for (MenuItem item : items) {
                    totalRatings += item.getAveragerating();
                }
                final double avgAsFinal = totalRatings / items.size();
                items.sort((o1, o2) -> {
                    double ratingScore1 = (o1.averagerating * o1.totalratings + avgAsFinal * cVal) / (o1.totalratings + cVal);
                    double ratingScore2 = (o2.averagerating * o2.totalratings + avgAsFinal * cVal) / (o2.totalratings + cVal);
                    return Double.compare(ratingScore1, ratingScore2);
                });
            }
        }
    }


    public double getActualPrice() {
        double output = getPrice();

        if (getDeal() != null) {
            if (getDeal().isIsPercentageBased()) {
                output *= (1 - getDeal().getDiscount()/100.0);
            }
        }

        return output;
    }



    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getIconUrl() {
        return iconUrl;
    }
    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }
    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public MenuCategory getCategory() {
        return category;
    }
    public void setCategory(MenuCategory category) {
        this.category = category;
    }
    public double getAveragerating() {
        return averagerating;
    }
    public void setAveragerating(double averageRating) {
        this.averagerating = averageRating;
    }
    public Integer getTotalratings() {
        return totalratings;
    }
    public void setTotalratings(int totalRatings) {
        this.totalratings = totalRatings;
    }
    public FeaturedItem getDeal() {
        return deal;
    }
    public void setDeal(FeaturedItem deal) {
        this.deal = deal;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
