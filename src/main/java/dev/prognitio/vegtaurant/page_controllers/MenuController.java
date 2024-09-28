package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MenuController {
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final AccountRepository accountRepository;

    public MenuController(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository, AccountRepository accountRepository) {
        //if encountering errors, make sure to drop both tables first.
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.accountRepository = accountRepository;
        doDatabaseTestCase();
    }


    @GetMapping("/menu")
    public String home(Model model) {
        model.addAttribute("menuCategories", menuCategoryRepository.findAll());
        return "menu";
    }


    public void doDatabaseTestCase() { //TODO delete before completion
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
        menuOption1.setIconUrl("https://google.com");
        menuOption1.setPrice(1.00);
        menuOption1.setCategory(testCat1);
        menuItemRepository.save(menuOption1);
        MenuItem menuOption2 = new MenuItem();
        menuOption2.setLabel("MenuOption2");
        menuOption2.setDescription("Your default drink!");
        menuOption2.setIconUrl("https://google.com");
        menuOption2.setPrice(1.00);
        menuOption2.setCategory(testCat1);
        menuItemRepository.save(menuOption2);
        MenuItem menuOption3 = new MenuItem();
        menuOption3.setLabel("MenuOption3");
        menuOption3.setDescription("Your default drink!");
        menuOption3.setIconUrl("https://google.com");
        menuOption3.setPrice(1.00);
        menuOption3.setCategory(testCat1);
        menuItemRepository.save(menuOption3);
    }
}
