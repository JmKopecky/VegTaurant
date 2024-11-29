package dev.prognitio.vegtaurant;

import dev.prognitio.vegtaurant.data_storage.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VegtaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(VegtaurantApplication.class, args);
	}


	public static void doDatabaseTestCase(MenuCategoryRepository menuCategoryRepository, MenuItemRepository menuItemRepository, FeaturedItemRepository featuredItemRepository, ProductRatingRepository productRatingRepository, AccountRepository accountRepository, RestaurantLocationRepository restaurantLocationRepository, PlacedOrderRepository placedOrderRepository) { //TODO delete before completion

		if (menuCategoryRepository.count() != 0) {
			return;
		}


		MenuCategory breakfast = new MenuCategory();
		breakfast.setTitle("Breakfast");
		menuCategoryRepository.save(breakfast);

		MenuCategory dinner = new MenuCategory();
		dinner.setTitle("Dinner");
		menuCategoryRepository.save(dinner);

		MenuCategory sides = new MenuCategory();
		sides.setTitle("Sides");
		menuCategoryRepository.save(sides);

		MenuCategory drinks = new MenuCategory();
		drinks.setTitle("Drinks");
		menuCategoryRepository.save(drinks);

		MenuCategory desserts = new MenuCategory();
		desserts.setTitle("Desserts");
		menuCategoryRepository.save(desserts);


		MenuItem menuOption1 = new MenuItem();
		menuOption1.setLabel("MenuOption1");
		menuOption1.setTag("Water");
		menuOption1.setDescription("Your default drink!");
		menuOption1.setIconUrl("images/applenobackground.png");
		menuOption1.setPrice(1.00);
		menuOption1.setCategory(drinks);
		menuOption1.setAveragerating(5);
		menuOption1.setTotalratings(10);
		menuItemRepository.save(menuOption1);

		MenuItem menuOption2 = new MenuItem();
		menuOption2.setLabel("MenuOption2");
		menuOption2.setTag("Water");
		menuOption2.setDescription("Your default drink!");
		menuOption2.setIconUrl("images/applenobackground.png");
		menuOption2.setPrice(1.00);
		menuOption2.setCategory(drinks);
		menuOption2.setAveragerating(4);
		menuOption2.setTotalratings(6);
		menuItemRepository.save(menuOption2);

		MenuItem menuOption3 = new MenuItem();
		menuOption3.setLabel("MenuOption3");
		menuOption3.setTag("Water");
		menuOption3.setDescription("Your default drink!");
		menuOption3.setIconUrl("images/applenobackground.png");
		menuOption3.setPrice(1.00);
		menuOption3.setCategory(drinks);
		menuOption3.setAveragerating(5);
		menuOption3.setTotalratings(2);
		menuItemRepository.save(menuOption3);

		MenuItem menuOption4 = new MenuItem();
		menuOption4.setLabel("MenuOption4");
		menuOption4.setTag("Water");
		menuOption4.setDescription("Your default drink!");
		menuOption4.setIconUrl("images/applenobackground.png");
		menuOption4.setPrice(1.00);
		menuOption4.setCategory(drinks);
		menuOption4.setAveragerating(3);
		menuOption4.setTotalratings(50);
		menuItemRepository.save(menuOption4);

		MenuItem menuOption5 = new MenuItem();
		menuOption5.setLabel("MenuOption5");
		menuOption5.setTag("Water");
		menuOption5.setDescription("Your default drink!");
		menuOption5.setIconUrl("images/applenobackground.png");
		menuOption5.setPrice(1.00);
		menuOption5.setCategory(drinks);
		menuOption5.setAveragerating(3);
		menuOption5.setTotalratings(50);
		menuItemRepository.save(menuOption5);

		MenuItem menuOption6 = new MenuItem();
		menuOption6.setLabel("MenuOption6");
		menuOption6.setTag("Water");
		menuOption6.setDescription("Your default drink!");
		menuOption6.setIconUrl("images/applenobackground.png");
		menuOption6.setPrice(1.00);
		menuOption6.setCategory(drinks);
		menuOption6.setAveragerating(3);
		menuOption6.setTotalratings(50);
		menuItemRepository.save(menuOption6);

		MenuItem menuOption7 = new MenuItem();
		menuOption7.setLabel("MenuOption7");
		menuOption7.setTag("Ice");
		menuOption7.setDescription("Your default drink!");
		menuOption7.setIconUrl("images/applenobackground.png");
		menuOption7.setPrice(1.00);
		menuOption7.setCategory(drinks);
		menuOption7.setAveragerating(3);
		menuOption7.setTotalratings(50);
		menuItemRepository.save(menuOption7);

		MenuItem menuOption8 = new MenuItem();
		menuOption8.setLabel("MenuOption8");
		menuOption8.setTag("Water");
		menuOption8.setDescription("Your default drink!");
		menuOption8.setIconUrl("images/applenobackground.png");
		menuOption8.setPrice(1.00);
		menuOption8.setCategory(drinks);
		menuOption8.setAveragerating(3);
		menuOption8.setTotalratings(50);

		FeaturedItem waterDeal = new FeaturedItem();
		waterDeal.setFeaturedPrecedence(100);
		waterDeal.setIsPercentageBased(true);
		waterDeal.setDiscount(50);
		waterDeal.setMessage("Treat yourself with a half-off cup o-water!");
		featuredItemRepository.save(waterDeal);

		menuOption8.setDeal(waterDeal);
		menuItemRepository.save(menuOption8);

		Account acc = new Account();
		acc.setName("John Doe");
		accountRepository.save(acc);

		ProductRating rating = new ProductRating();
		rating.setRating(5);
		rating.setMessage("Best product I've ever seen! I want this at my birthday next year, and I will not hear otherwise.");
		rating.setReviewer(acc);
		rating.setProduct(menuOption8);
		productRatingRepository.save(rating);

		ProductRating rating2 = new ProductRating();
		rating2.setRating(1);
		rating2.setMessage("Literal trash. Take this product and toss it into a volcano. No, that's too good for it.");
		rating2.setReviewer(acc);
		rating2.setProduct(menuOption6);
		productRatingRepository.save(rating2);

		ProductRating rating3 = new ProductRating();
		rating3.setRating(3);
		rating3.setMessage("Meh. It's tolerable at best. This place was the only one in delivery range, so I guess their delivery service is good.");
		rating3.setReviewer(acc);
		rating3.setProduct(menuOption7);
		productRatingRepository.save(rating3);

		ProductRating rating4 = new ProductRating();
		rating4.setRating(4);
		rating4.setMessage("I normally like this, but once I found a tooth in my meal. Gross. Never happened again though!");
		rating4.setReviewer(acc);
		rating4.setProduct(menuOption7);
		productRatingRepository.save(rating4);

		RestaurantLocation location1 = new RestaurantLocation();
		location1.setAddressLine("1234 Lorem Ipsum Lane");
		location1.setCity("Baytown");
		location1.setState("Texas");
		location1.setZipCode("77521");
		restaurantLocationRepository.save(location1);

		RestaurantLocation location2 = new RestaurantLocation();
		location2.setAddressLine("4321 Goose Creek Memorial");
		location2.setCity("Baytown");
		location2.setState("Texas");
		location2.setZipCode("77522");
		restaurantLocationRepository.save(location2);




	}


}
