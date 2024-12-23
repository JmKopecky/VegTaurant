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


		//note drinks
		MenuItem waterOption = new MenuItem();
		waterOption.setLabel("Water");
		waterOption.setTag("Misc Drinks");
		waterOption.setDescription("Filtered to be entirely clear and clean.");
		waterOption.setIconUrl("images/products/drinks/water.jpg");
		waterOption.setPrice(0.25);
		waterOption.setCategory(drinks);
		waterOption.setAveragerating(5);
		waterOption.setTotalratings(1);
		menuItemRepository.save(waterOption);


		MenuItem tea1 = new MenuItem();
		tea1.setLabel("Black Tea");
		tea1.setTag("Teas");
		tea1.setDescription("Your simple warm tea with a strong flavor, perfectly refreshing whilst not containing excessive sugar!");
		tea1.setIconUrl("images/products/drinks/blacktea.jpg");
		tea1.setPrice(2.0);
		tea1.setCategory(drinks);
		tea1.setAveragerating(5);
		tea1.setTotalratings(1);
		menuItemRepository.save(tea1);

		MenuItem tea2 = new MenuItem();
		tea2.setLabel("Iced Tea");
		tea2.setTag("Teas");
		tea2.setDescription("Made with the same leaves as our black tea, this nonetheless is kept chilled: perfect on hot days!\n");
		tea2.setIconUrl("images/products/drinks/icedtea.jpg");
		tea2.setPrice(2.0);
		tea2.setCategory(drinks);
		tea2.setAveragerating(5);
		tea2.setTotalratings(1);
		menuItemRepository.save(tea2);

		MenuItem tea3 = new MenuItem();
		tea3.setLabel("Green Tea");
		tea3.setTag("Teas");
		tea3.setDescription("Combine immense health benefits with a nice, earthy flavor.");
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
		orangejuice.setLabel("Orange Juice");
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

		//note: breakfast
		MenuItem eggBreakfastSandwich = new MenuItem();
		eggBreakfastSandwich.setLabel("Egg Breakfast Sandwich");
		eggBreakfastSandwich.setTag("Breakfast Sandwiches");
		eggBreakfastSandwich.setDescription("A delicious fried egg on a brioche bun.");
		eggBreakfastSandwich.setIconUrl("images/products/breakfast/eggbreakfastsandwich.jpg");
		eggBreakfastSandwich.setPrice(4);
		eggBreakfastSandwich.setCategory(breakfast);
		eggBreakfastSandwich.setAveragerating(5);
		eggBreakfastSandwich.setTotalratings(1);
		menuItemRepository.save(eggBreakfastSandwich);

		MenuItem frenchToast = new MenuItem();
		frenchToast.setLabel("French Toast");
		frenchToast.setTag("Breads & Grain");
		frenchToast.setDescription("Two slices of delectable french toast, covered in delicious mixed berries.");
		frenchToast.setIconUrl("images/products/breakfast/frenchtoast.jpg");
		frenchToast.setPrice(2.5);
		frenchToast.setCategory(breakfast);
		frenchToast.setAveragerating(5);
		frenchToast.setTotalratings(1);
		menuItemRepository.save(frenchToast);

		MenuItem waffles = new MenuItem();
		waffles.setLabel("Waffles");
		waffles.setTag("Breads & Grain");
		waffles.setDescription("Crispy waffles, toasted to perfection.");
		waffles.setIconUrl("images/products/breakfast/waffles.jpg");
		waffles.setPrice(1.5);
		waffles.setCategory(breakfast);
		waffles.setAveragerating(5);
		waffles.setTotalratings(1);
		menuItemRepository.save(waffles);

		MenuItem cereal = new MenuItem();
		cereal.setLabel("Cereal");
		cereal.setTag("Breads & Grain");
		cereal.setDescription("An old classic! All-grain cereal mixed with assorted berries.");
		cereal.setIconUrl("images/products/breakfast/cereal.jpg");
		cereal.setPrice(1);
		cereal.setCategory(breakfast);
		cereal.setAveragerating(5);
		cereal.setTotalratings(1);
		menuItemRepository.save(cereal);

		MenuItem strawberryYogurt = new MenuItem();
		strawberryYogurt.setLabel("Strawberry Yogurt");
		strawberryYogurt.setTag("Milk-Based");
		strawberryYogurt.setDescription("Perfectly creamy yogurt bowl mixed with crushed strawberries and a biscuit.");
		strawberryYogurt.setIconUrl("images/products/breakfast/strawberryyogurt.jpg");
		strawberryYogurt.setPrice(1.5);
		strawberryYogurt.setCategory(breakfast);
		strawberryYogurt.setAveragerating(5);
		strawberryYogurt.setTotalratings(1);
		menuItemRepository.save(strawberryYogurt);

		MenuItem sweetBerrySmoothie = new MenuItem();
		sweetBerrySmoothie.setLabel("Sweet Berry Smoothie");
		sweetBerrySmoothie.setTag("Milk-Based");
		sweetBerrySmoothie.setDescription("Down a nice smoothie with delicious blackberries.");
		sweetBerrySmoothie.setIconUrl("images/products/breakfast/smoothie.jpg");
		sweetBerrySmoothie.setPrice(1.5);
		sweetBerrySmoothie.setCategory(breakfast);
		sweetBerrySmoothie.setAveragerating(5);
		sweetBerrySmoothie.setTotalratings(1);
		menuItemRepository.save(sweetBerrySmoothie);

		MenuItem cheesyCroissantSandwich = new MenuItem();
		cheesyCroissantSandwich.setLabel("Cheesy Croissant Sandwich");
		cheesyCroissantSandwich.setTag("Breakfast Sandwiches");
		cheesyCroissantSandwich.setDescription("Savor a perfectly baked croissant with a delicious cheese filling.");
		cheesyCroissantSandwich.setIconUrl("images/products/breakfast/croissantsandwich.jpg");
		cheesyCroissantSandwich.setPrice(1.5);
		cheesyCroissantSandwich.setCategory(breakfast);
		cheesyCroissantSandwich.setAveragerating(5);
		cheesyCroissantSandwich.setTotalratings(1);
		menuItemRepository.save(cheesyCroissantSandwich);

		MenuItem bagelSandwich = new MenuItem();
		bagelSandwich.setLabel("Bagel Sandwich");
		bagelSandwich.setTag("Breakfast Sandwiches");
		bagelSandwich.setDescription("Enjoy a seed-filled bagel containing delectably creamy cheese and egg.");
		bagelSandwich.setIconUrl("images/products/breakfast/bagelsandwich.jpg");
		bagelSandwich.setPrice(1.5);
		bagelSandwich.setCategory(breakfast);
		bagelSandwich.setAveragerating(5);
		bagelSandwich.setTotalratings(1);
		menuItemRepository.save(bagelSandwich);


		//note: dinner
		MenuItem spicyPasta = new MenuItem();
		spicyPasta.setLabel("Spicy Pasta");
		spicyPasta.setTag("Pasta");
		spicyPasta.setDescription("Delicious pasta, with chili peppers for a dash of spice.");
		spicyPasta.setIconUrl("images/products/dinner/spicypasta.jpg");
		spicyPasta.setPrice(4);
		spicyPasta.setCategory(dinner);
		spicyPasta.setAveragerating(5);
		spicyPasta.setTotalratings(1);
		menuItemRepository.save(spicyPasta);

		MenuItem spaghetti = new MenuItem();
		spaghetti.setLabel("Spaghetti");
		spaghetti.setTag("Pasta");
		spaghetti.setDescription("Spaghetti basking in red sauce, filled with tomatoes.");
		spaghetti.setIconUrl("images/products/dinner/sphagetti.jpg");
		spaghetti.setPrice(3.5);
		spaghetti.setCategory(dinner);
		spaghetti.setAveragerating(5);
		spaghetti.setTotalratings(1);
		menuItemRepository.save(spaghetti);

		MenuItem riceVeggieBowl = new MenuItem();
		riceVeggieBowl.setLabel("Rice Veggie Bowl");
		riceVeggieBowl.setTag("Dinner Bowls");
		riceVeggieBowl.setDescription("Bowl of rice with mixed in cucumbers, tomatoes, and assorted greens.");
		riceVeggieBowl.setIconUrl("images/products/dinner/riceveggiebowl.jpg");
		riceVeggieBowl.setPrice(2);
		riceVeggieBowl.setCategory(dinner);
		riceVeggieBowl.setAveragerating(5);
		riceVeggieBowl.setTotalratings(1);
		menuItemRepository.save(riceVeggieBowl);

		MenuItem riceBeanBowl = new MenuItem();
		riceBeanBowl.setLabel("Rice Bean Bowl");
		riceBeanBowl.setTag("Dinner Bowls");
		riceBeanBowl.setDescription("A bowl of rice mixed with protein-rich beans.");
		riceBeanBowl.setIconUrl("images/products/dinner/ricebeanbowl.jpg");
		riceBeanBowl.setPrice(2);
		riceBeanBowl.setCategory(dinner);
		riceBeanBowl.setAveragerating(5);
		riceBeanBowl.setTotalratings(1);
		menuItemRepository.save(riceBeanBowl);

		MenuItem greenBeanBowl = new MenuItem();
		greenBeanBowl.setLabel("Green Bean Bowl");
		greenBeanBowl.setTag("Dinner Bowls");
		greenBeanBowl.setDescription("Bowl of fresh seasoned green beans.");
		greenBeanBowl.setIconUrl("images/products/dinner/greenbeanbowl.jpg");
		greenBeanBowl.setPrice(2);
		greenBeanBowl.setCategory(dinner);
		greenBeanBowl.setAveragerating(5);
		greenBeanBowl.setTotalratings(1);
		menuItemRepository.save(greenBeanBowl);

		MenuItem saladPlate = new MenuItem();
		saladPlate.setLabel("Salad Plate");
		saladPlate.setTag("Salads");
		saladPlate.setDescription("Fresh plate of salad consisting of assorted herbs, tomatoes, radishes, and cucumbers.");
		saladPlate.setIconUrl("images/products/dinner/saladplate.jpg");
		saladPlate.setPrice(2);
		saladPlate.setCategory(dinner);
		saladPlate.setAveragerating(5);
		saladPlate.setTotalratings(1);
		menuItemRepository.save(saladPlate);

		MenuItem gourmetSoup = new MenuItem();
		gourmetSoup.setLabel("Gourmet Soup");
		gourmetSoup.setTag("Dinner Bowls");
		gourmetSoup.setDescription("Perfectly creamy soup with chives, parsley, squash, and assorted herbs.");
		gourmetSoup.setIconUrl("images/products/dinner/gourmetsoup.jpg");
		gourmetSoup.setPrice(3);
		gourmetSoup.setCategory(dinner);
		gourmetSoup.setAveragerating(5);
		gourmetSoup.setTotalratings(1);
		menuItemRepository.save(gourmetSoup);

		MenuItem herbalPearPizza = new MenuItem();
		herbalPearPizza.setLabel("Herbal Pear Pizza");
		herbalPearPizza.setTag("Pizza");
		herbalPearPizza.setDescription("A delectable cheese pizza with slices of fresh pears, covered in assorted herbs.");
		herbalPearPizza.setIconUrl("images/products/dinner/herbalpearpizza.jpg");
		herbalPearPizza.setPrice(6);
		herbalPearPizza.setCategory(dinner);
		herbalPearPizza.setAveragerating(5);
		herbalPearPizza.setTotalratings(1);
		menuItemRepository.save(herbalPearPizza);

		MenuItem crispyMediterraneanPizza = new MenuItem();
		crispyMediterraneanPizza.setLabel("Crispy Mediterranean Pizza");
		crispyMediterraneanPizza.setTag("Pizza");
		crispyMediterraneanPizza.setDescription("Cheesy and crispy mediterranean pizza with zucchini, eggplants, and red pepper.");
		crispyMediterraneanPizza.setIconUrl("images/products/dinner/crispymeditarraneanpizza.jpg");
		crispyMediterraneanPizza.setPrice(8);
		crispyMediterraneanPizza.setCategory(dinner);
		crispyMediterraneanPizza.setAveragerating(5);
		crispyMediterraneanPizza.setTotalratings(1);
		menuItemRepository.save(crispyMediterraneanPizza);


		FeaturedItem pizzaDeal = new FeaturedItem();
		pizzaDeal.setFeaturedPrecedence(101);
		pizzaDeal.setIsPercentageBased(true);
		pizzaDeal.setDiscount(25);
		pizzaDeal.setMessage("Feed you and your friends with a discount on mediterranean pizza!");
		featuredItemRepository.save(pizzaDeal);

		crispyMediterraneanPizza.setDeal(pizzaDeal);
		menuItemRepository.save(crispyMediterraneanPizza);


		MenuItem cheeseSandwich = new MenuItem();
		cheeseSandwich.setLabel("Cheese Sandwich");
		cheeseSandwich.setTag("Sandwiches");
		cheeseSandwich.setDescription("Freshly toasted artisanal bread with creamy cheese filling.");
		cheeseSandwich.setIconUrl("images/products/dinner/cheesesandwich.jpg");
		cheeseSandwich.setPrice(1.5);
		cheeseSandwich.setCategory(dinner);
		cheeseSandwich.setAveragerating(5);
		cheeseSandwich.setTotalratings(1);
		menuItemRepository.save(cheeseSandwich);

		MenuItem grilledSandwichPlatter = new MenuItem();
		grilledSandwichPlatter.setLabel("Grilled Sandwich Platter");
		grilledSandwichPlatter.setTag("Sandwiches");
		grilledSandwichPlatter.setDescription("A spread of finger sandwiches, grilled to perfection.");
		grilledSandwichPlatter.setIconUrl("images/products/dinner/grilledsandwichplatter.jpg");
		grilledSandwichPlatter.setPrice(4);
		grilledSandwichPlatter.setCategory(dinner);
		grilledSandwichPlatter.setAveragerating(5);
		grilledSandwichPlatter.setTotalratings(1);
		menuItemRepository.save(grilledSandwichPlatter);


		//note desserts
		MenuItem strawberryPie = new MenuItem();
		strawberryPie.setLabel("Strawberry Pie");
		strawberryPie.setTag("Pies");
		strawberryPie.setDescription("Have a slice of delicious, sweet strawberry pie, made with a crispy whole grain crust that ensures a guilt free eating experience.");
		strawberryPie.setIconUrl("images/products/desserts/strawberrypie.jpg");
		strawberryPie.setPrice(3);
		strawberryPie.setCategory(desserts);
		strawberryPie.setAveragerating(5);
		strawberryPie.setTotalratings(1);
		menuItemRepository.save(strawberryPie);

		MenuItem applePie = new MenuItem();
		applePie.setLabel("Apple Pie");
		applePie.setTag("Pies");
		applePie.setDescription("Take a bite from a slice of sweet apple pie, made with a delectable whole grain crust.");
		applePie.setIconUrl("images/products/desserts/applepie.jpg");
		applePie.setPrice(3);
		applePie.setCategory(desserts);
		applePie.setAveragerating(5);
		applePie.setTotalratings(1);
		menuItemRepository.save(applePie);

		MenuItem bananaBread = new MenuItem();
		bananaBread.setLabel("Banana Bread");
		bananaBread.setTag("Banana Based");
		bananaBread.setDescription("Savor a slice of freshly baked banana bread, filled with pecans and served with sugar-free syrup.");
		bananaBread.setIconUrl("images/products/desserts/bananabread.jpg");
		bananaBread.setPrice(3);
		bananaBread.setCategory(desserts);
		bananaBread.setAveragerating(5);
		bananaBread.setTotalratings(1);
		menuItemRepository.save(bananaBread);

		MenuItem bananaPudding = new MenuItem();
		bananaPudding.setLabel("Banana Pudding");
		bananaPudding.setTag("Banana Based");
		bananaPudding.setDescription("Enjoy a cup of fresh cold and creamy banana pudding.");
		bananaPudding.setIconUrl("images/products/desserts/bananapudding.jpg");
		bananaPudding.setPrice(2.5);
		bananaPudding.setCategory(desserts);
		bananaPudding.setAveragerating(5);
		bananaPudding.setTotalratings(1);
		menuItemRepository.save(bananaPudding);

		MenuItem berryCheesecake = new MenuItem();
		berryCheesecake.setLabel("Berry Cheesecake");
		berryCheesecake.setTag("Cakes");
		berryCheesecake.setDescription("Take a bite of a delectably creamy cheesecake, topped with a sweet berry sauce.");
		berryCheesecake.setIconUrl("images/products/desserts/berrycheesecake.jpg");
		berryCheesecake.setPrice(3);
		berryCheesecake.setCategory(desserts);
		berryCheesecake.setAveragerating(5);
		berryCheesecake.setTotalratings(1);
		menuItemRepository.save(berryCheesecake);


		//note sides
		MenuItem spinachAvocadoToast = new MenuItem();
		spinachAvocadoToast.setLabel("Spinach Avocado Toast");
		spinachAvocadoToast.setTag("Snacks");
		spinachAvocadoToast.setDescription("Perfectly toasted bread with a strong spread of avocado, topped with spinach and herbs.");
		spinachAvocadoToast.setIconUrl("images/products/sides/spinachavocadotoast.jpg");
		spinachAvocadoToast.setPrice(1);
		spinachAvocadoToast.setCategory(sides);
		spinachAvocadoToast.setAveragerating(5);
		spinachAvocadoToast.setTotalratings(1);
		menuItemRepository.save(spinachAvocadoToast);

		MenuItem strawberryBowl = new MenuItem();
		strawberryBowl.setLabel("Strawberry Bowl");
		strawberryBowl.setTag("Fruit Bowls");
		strawberryBowl.setDescription("A delectable bowl of freshly picked strawberries.");
		strawberryBowl.setIconUrl("images/products/sides/strawberrybowl.jpg");
		strawberryBowl.setPrice(1);
		strawberryBowl.setCategory(sides);
		strawberryBowl.setAveragerating(5);
		strawberryBowl.setTotalratings(1);
		menuItemRepository.save(strawberryBowl);

		MenuItem raspberryBowl = new MenuItem();
		raspberryBowl.setLabel("Raspberry Bowl");
		raspberryBowl.setTag("Fruit Bowls");
		raspberryBowl.setDescription("A fresh bowl of delicious raspberries.");
		raspberryBowl.setIconUrl("images/products/sides/raspberrybowl.jpg");
		raspberryBowl.setPrice(1);
		raspberryBowl.setCategory(sides);
		raspberryBowl.setAveragerating(5);
		raspberryBowl.setTotalratings(1);
		menuItemRepository.save(raspberryBowl);

		MenuItem watermelonBowl = new MenuItem();
		watermelonBowl.setLabel("Watermelon Bowl");
		watermelonBowl.setTag("Fruit Bowls");
		watermelonBowl.setDescription("A fresh bowl of juicy watermelons slices.");
		watermelonBowl.setIconUrl("images/products/sides/watermelonbowl.jpg");
		watermelonBowl.setPrice(1);
		watermelonBowl.setCategory(sides);
		watermelonBowl.setAveragerating(5);
		watermelonBowl.setTotalratings(1);
		menuItemRepository.save(watermelonBowl);

		MenuItem cherryBowl = new MenuItem();
		cherryBowl.setLabel("Cherry Bowl");
		cherryBowl.setTag("Fruit Bowls");
		cherryBowl.setDescription("A bowl of freshly picked, sweet, delicious cherries.");
		cherryBowl.setIconUrl("images/products/sides/cherrybowl.jpg");
		cherryBowl.setPrice(1);
		cherryBowl.setCategory(sides);
		cherryBowl.setAveragerating(5);
		cherryBowl.setTotalratings(1);
		menuItemRepository.save(cherryBowl);

		MenuItem sweetPotatoFries = new MenuItem();
		sweetPotatoFries.setLabel("Sweet Potato Fries");
		sweetPotatoFries.setTag("Snacks");
		sweetPotatoFries.setDescription("A small plate of crispy seasoned sweet potato fries.");
		sweetPotatoFries.setIconUrl("images/products/sides/sweetpotatofries.jpg");
		sweetPotatoFries.setPrice(1.5);
		sweetPotatoFries.setCategory(sides);
		sweetPotatoFries.setAveragerating(5);
		sweetPotatoFries.setTotalratings(1);
		menuItemRepository.save(sweetPotatoFries);

		MenuItem macncheese = new MenuItem();
		macncheese.setLabel("Low-Fat Mac And Cheese");
		macncheese.setTag("Snacks");
		macncheese.setDescription("Have a guilt-free bowl of delicious, low-fat mac and cheese.");
		macncheese.setIconUrl("images/products/sides/macncheese.jpg");
		macncheese.setPrice(1.5);
		macncheese.setCategory(sides);
		macncheese.setAveragerating(5);
		macncheese.setTotalratings(1);
		menuItemRepository.save(macncheese);




		Account acc = new Account();
		acc.setName("John Doe");
		accountRepository.save(acc);

		ProductRating rating = new ProductRating();
		rating.setRating(5);
		rating.setMessage("This pizza was absolutely delectable, and I was able to enjoy it guilt free as well!");
		rating.setReviewer(acc);
		rating.setProduct(crispyMediterraneanPizza);
		productRatingRepository.save(rating);

		ProductRating rating2 = new ProductRating();
		rating2.setRating(5);
		rating2.setMessage("I've never normally seen this type of thing at vegetarian restaurants, but it was delicious!");
		rating2.setReviewer(acc);
		rating2.setProduct(eggBreakfastSandwich);
		productRatingRepository.save(rating2);

		ProductRating rating3 = new ProductRating();
		rating3.setRating(3);
		rating3.setMessage("The recyclable packaging didn't fare well when I spilled my drink. Still, it was an overall solid experience.");
		rating3.setReviewer(acc);
		rating3.setProduct(bananaPudding);
		productRatingRepository.save(rating3);

		ProductRating rating4 = new ProductRating();
		rating4.setRating(5);
		rating4.setMessage("These cherries are divine, and I would die for them.");
		rating4.setReviewer(acc);
		rating4.setProduct(cherryBowl);
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
