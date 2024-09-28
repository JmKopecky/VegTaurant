package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.VegtaurantApplication;
import dev.prognitio.vegtaurant.data_storage.AccountRepository;
import dev.prognitio.vegtaurant.data_storage.MenuCategoryRepository;
import dev.prognitio.vegtaurant.data_storage.MenuItem;
import dev.prognitio.vegtaurant.data_storage.MenuItemRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

@Controller
public class HomeController {


    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final AccountRepository accountRepository;

    public HomeController(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository, AccountRepository accountRepository) {
        //if encountering errors, make sure to drop both tables first.
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.accountRepository = accountRepository;
        VegtaurantApplication.doDatabaseTestCase(menuCategoryRepository, menuItemRepository);
    }


    @GetMapping("/")
    public String home(Model model) {
        ArrayList<MenuItem> topHalfMenuItems = new ArrayList<>();
        menuItemRepository.findAll().forEach(topHalfMenuItems::add);
        MenuItem.sort(topHalfMenuItems, "rating");
        if (topHalfMenuItems.size() > 8) {
            model.addAttribute("tophalfmenuitems", topHalfMenuItems.subList(0, topHalfMenuItems.size() / 2));
        } else {
            model.addAttribute("tophalfmenuitems", topHalfMenuItems);
        }
        return "home";
    }
}
