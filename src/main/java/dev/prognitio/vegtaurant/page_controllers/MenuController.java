package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.MenuCategory;
import dev.prognitio.vegtaurant.data_storage.MenuCategoryRepository;
import dev.prognitio.vegtaurant.data_storage.MenuItem;
import dev.prognitio.vegtaurant.data_storage.MenuItemRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MenuController {
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;

    public MenuController(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository) {
        //if encountering errors, make sure to drop both tables first.
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;

        MenuCategory drinks = new MenuCategory();
        drinks.setTitle("Drinks");
        menuCategoryRepository.save(drinks);

        MenuCategory sides = new MenuCategory();
        sides.setTitle("Sides");
        menuCategoryRepository.save(sides);

        MenuCategory breakfast = new MenuCategory();
        breakfast.setTitle("Breakfast");
        menuCategoryRepository.save(breakfast);

        MenuCategory sandwiches = new MenuCategory();
        sandwiches.setTitle("Sandwiches");
        menuCategoryRepository.save(sandwiches);


        MenuItem water = new MenuItem();
        water.setLabel("Water");
        water.setDescription("Your default drink!");
        water.setIconUrl("https://google.com");
        water.setPrice(1.00);
        water.setCategory(drinks);
        menuItemRepository.save(water);

    }

    @GetMapping("/menu")
    public String home(Model model) {
        model.addAttribute("menuCategories", menuCategoryRepository.findAll());
        return "menu";
    }
}
