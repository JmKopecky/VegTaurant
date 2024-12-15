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


		MenuItem waterOption = new MenuItem();
		waterOption.setLabel("Water");
		waterOption.setTag("Misc");
		waterOption.setDescription("Filtered to be entirely clear and clean.");
		waterOption.setIconUrl("images/products/drinks/water.jpg");
		waterOption.setPrice(0.25);
		waterOption.setCategory(drinks);
		waterOption.setAveragerating(5);
		waterOption.setTotalratings(1);
		menuItemRepository.save(waterOption);

		FeaturedItem waterDeal = new FeaturedItem();
		waterDeal.setFeaturedPrecedence(100);
		waterDeal.setIsPercentageBased(true);
		waterDeal.setDiscount(50);
		waterDeal.setMessage("Treat yourself with a half-off cup o-water!");
		featuredItemRepository.save(waterDeal);

		waterOption.setDeal(waterDeal);
		menuItemRepository.save(waterOption);

		MenuItem tea1 = new MenuItem();
		tea1.setLabel("Black Tea");
		tea1.setTag("Teas");
		tea1.setDescription("TODO");
		tea1.setIconUrl("images/products/drinks/blacktea.jpg");
		tea1.setPrice(2.0);
		tea1.setCategory(drinks);
		tea1.setAveragerating(5);
		tea1.setTotalratings(1);
		menuItemRepository.save(tea1);

		MenuItem tea2 = new MenuItem();
		tea2.setLabel("Iced Tea");
		tea2.setTag("Teas");
		tea2.setDescription("TODO");
		tea2.setIconUrl("images/products/drinks/icedtea.jpg");
		tea2.setPrice(2.0);
		tea2.setCategory(drinks);
		tea2.setAveragerating(5);
		tea2.setTotalratings(1);
		menuItemRepository.save(tea2);

		MenuItem tea3 = new MenuItem();
		tea3.setLabel("Green Tea");
		tea3.setTag("Teas");
		tea3.setDescription("TODO");
		tea3.setIconUrl("images/products/drinks/greentea.jpg");
		tea3.setPrice(2.5);
		tea3.setCategory(drinks);
		tea3.setAveragerating(5);
		tea3.setTotalratings(1);
		menuItemRepository.save(tea3);

		MenuItem applejuice = new MenuItem();
		applejuice.setLabel("Apple Juice");
		applejuice.setTag("Juices");
		applejuice.setDescription("Freshly and locally picked apples, juiced ready to order.");
		applejuice.setIconUrl("images/products/drinks/applejuice.jpg");
		applejuice.setPrice(1);
		applejuice.setCategory(drinks);
		applejuice.setAveragerating(5);
		applejuice.setTotalratings(1);
		menuItemRepository.save(applejuice);

		MenuItem orangejuice = new MenuItem();
		orangejuice.setLabel("Orance Juice");
		orangejuice.setTag("Juices");
		orangejuice.setDescription("Freshly grown oranges sourced locally, juiced including pulp for maximum nutrition.");
		orangejuice.setIconUrl("images/products/drinks/orangejuice.jpg");
		orangejuice.setPrice(1);
		orangejuice.setCategory(drinks);
		orangejuice.setAveragerating(5);
		orangejuice.setTotalratings(1);
		menuItemRepository.save(orangejuice);

		MenuItem grapejuice = new MenuItem();
		grapejuice.setLabel("Grape Juice");
		grapejuice.setTag("Juices");
		grapejuice.setDescription("Grapes picked fresh by local partners, steam-juiced for maximum flavor.");
		grapejuice.setIconUrl("images/products/drinks/grapejuice.jpg");
		grapejuice.setPrice(1.5);
		grapejuice.setCategory(drinks);
		grapejuice.setAveragerating(5);
		grapejuice.setTotalratings(1);
		menuItemRepository.save(grapejuice);

		/*
		Account acc = new Account();
		acc.setName("John Doe");
		accountRepository.save(acc);

		ProductRating rating = new ProductRating();
		rating.setRating(5);
		rating.setMessage("Best product I've ever seen! I want this at my birthday next year, and I will not hear otherwise.");
		rating.setReviewer(acc);
		rating.setProduct(menuOption1);
		productRatingRepository.save(rating);

		ProductRating rating2 = new ProductRating();
		rating2.setRating(1);
		rating2.setMessage("Literal trash. Take this product and toss it into a volcano. No, that's too good for it.");
		rating2.setReviewer(acc);
		rating2.setProduct(menuOption1);
		productRatingRepository.save(rating2);

		ProductRating rating3 = new ProductRating();
		rating3.setRating(3);
		rating3.setMessage("Meh. It's tolerable at best. This place was the only one in delivery range, so I guess their delivery service is good.");
		rating3.setReviewer(acc);
		rating3.setProduct(menuOption1);
		productRatingRepository.save(rating3);

		ProductRating rating4 = new ProductRating();
		rating4.setRating(4);
		rating4.setMessage("I normally like this, but once I found a tooth in my meal. Gross. Never happened again though!");
		rating4.setReviewer(acc);
		rating4.setProduct(menuOption1);
		productRatingRepository.save(rating4);

		 */

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
