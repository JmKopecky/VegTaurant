package dev.prognitio.vegtaurant;

import dev.prognitio.vegtaurant.data_storage.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class VegtaurantApplication {

	public static void main(String[] args) {
		SpringApplication.run(VegtaurantApplication.class, args);
	}


	public static void doDatabaseTestCase(MenuCategoryRepository menuCategoryRepository, MenuItemRepository menuItemRepository, FeaturedItemRepository featuredItemRepository, ProductRatingRepository productRatingRepository, AccountRepository accountRepository) { //TODO delete before completion
		MenuCategory testCat1 = new MenuCategory();
		testCat1.setTitle("Option 1");
		menuCategoryRepository.save(testCat1);

		MenuCategory testCat2 = new MenuCategory();
		testCat2.setTitle("Option 2");
		menuCategoryRepository.save(testCat2);

		MenuCategory testCat3 = new MenuCategory();
		testCat3.setTitle("Option 3");
		menuCategoryRepository.save(testCat3);

		MenuCategory testCat4 = new MenuCategory();
		testCat4.setTitle("Option 4");
		menuCategoryRepository.save(testCat4);

		MenuCategory testCat5 = new MenuCategory();
		testCat5.setTitle("Option 5");
		menuCategoryRepository.save(testCat5);

		MenuCategory testCat6 = new MenuCategory();
		testCat6.setTitle("Option 6");
		menuCategoryRepository.save(testCat6);


		MenuItem menuOption1 = new MenuItem();
		menuOption1.setLabel("MenuOption1");
		menuOption1.setDescription("Your default drink!");
		menuOption1.setIconUrl("images/applenobackground.png");
		menuOption1.setPrice(1.00);
		menuOption1.setCategory(testCat1);
		menuOption1.setAveragerating(5);
		menuOption1.setTotalratings(10);
		menuItemRepository.save(menuOption1);

		MenuItem menuOption2 = new MenuItem();
		menuOption2.setLabel("MenuOption2");
		menuOption2.setDescription("Your default drink!");
		menuOption2.setIconUrl("images/applenobackground.png");
		menuOption2.setPrice(1.00);
		menuOption2.setCategory(testCat1);
		menuOption2.setAveragerating(4);
		menuOption2.setTotalratings(6);
		menuItemRepository.save(menuOption2);

		MenuItem menuOption3 = new MenuItem();
		menuOption3.setLabel("MenuOption3");
		menuOption3.setDescription("Your default drink!");
		menuOption3.setIconUrl("images/applenobackground.png");
		menuOption3.setPrice(1.00);
		menuOption3.setCategory(testCat1);
		menuOption3.setAveragerating(5);
		menuOption3.setTotalratings(2);
		menuItemRepository.save(menuOption3);

		MenuItem menuOption4 = new MenuItem();
		menuOption4.setLabel("MenuOption4");
		menuOption4.setDescription("Your default drink!");
		menuOption4.setIconUrl("images/applenobackground.png");
		menuOption4.setPrice(1.00);
		menuOption4.setCategory(testCat1);
		menuOption4.setAveragerating(3);
		menuOption4.setTotalratings(50);
		menuItemRepository.save(menuOption4);

		MenuItem menuOption5 = new MenuItem();
		menuOption5.setLabel("MenuOption5");
		menuOption5.setDescription("Your default drink!");
		menuOption5.setIconUrl("images/applenobackground.png");
		menuOption5.setPrice(1.00);
		menuOption5.setCategory(testCat1);
		menuOption5.setAveragerating(3);
		menuOption5.setTotalratings(50);
		menuItemRepository.save(menuOption5);

		MenuItem menuOption6 = new MenuItem();
		menuOption6.setLabel("MenuOption6");
		menuOption6.setDescription("Your default drink!");
		menuOption6.setIconUrl("images/applenobackground.png");
		menuOption6.setPrice(1.00);
		menuOption6.setCategory(testCat1);
		menuOption6.setAveragerating(3);
		menuOption6.setTotalratings(50);
		menuItemRepository.save(menuOption6);

		MenuItem menuOption7 = new MenuItem();
		menuOption7.setLabel("MenuOption7");
		menuOption7.setDescription("Your default drink!");
		menuOption7.setIconUrl("images/applenobackground.png");
		menuOption7.setPrice(1.00);
		menuOption7.setCategory(testCat1);
		menuOption7.setAveragerating(3);
		menuOption7.setTotalratings(50);
		menuItemRepository.save(menuOption7);

		MenuItem menuOption8 = new MenuItem();
		menuOption8.setLabel("MenuOption8");
		menuOption8.setDescription("Your default drink!");
		menuOption8.setIconUrl("images/applenobackground.png");
		menuOption8.setPrice(1.00);
		menuOption8.setCategory(testCat1);
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
	}


}
