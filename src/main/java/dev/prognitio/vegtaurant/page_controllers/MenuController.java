package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.VegtaurantApplication;
import dev.prognitio.vegtaurant.data_storage.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;


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
        VegtaurantApplication.doDatabaseTestCase(menuCategoryRepository, menuItemRepository);
    }


    @GetMapping("/menu")
    public String home(Model model) {
        model.addAttribute("menuCategories", menuCategoryRepository.findAll());
        return "menu";
    }



}
