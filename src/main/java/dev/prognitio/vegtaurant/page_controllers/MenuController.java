package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.VegtaurantApplication;
import dev.prognitio.vegtaurant.data_storage.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.HashMap;


@Controller
public class MenuController {
    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final AccountRepository accountRepository;
    private final FeaturedItemRepository featuredItemRepository;

    public MenuController(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository, AccountRepository accountRepository, FeaturedItemRepository featuredItemRepository) {
        //if encountering errors, make sure to drop both tables first.
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.accountRepository = accountRepository;
        this.featuredItemRepository = featuredItemRepository;
    }


    @GetMapping("/menu")
    public String home(Model model) {
        
        ArrayList<MenuCategory> menuCategories = (ArrayList<MenuCategory>) menuCategoryRepository.findAll();
        model.addAttribute("menuCategories", menuCategories);
        
        ArrayList<MenuItem> menuItems = (ArrayList<MenuItem>) menuItemRepository.findAll();
        
        HashMap<String, ArrayList<MenuItemTagContainer>> allTagContainers = new HashMap<>();
        
        //add all tags from menu categories
        for (MenuCategory menuCategory : menuCategories) {
            ArrayList<MenuItemTagContainer> menuTagsInCategory = new ArrayList<>();
            for (MenuItem menuItem : menuItems) {
                if (!menuItem.getCategory().equals(menuCategory)) continue;

                MenuItemTagContainer targetTag = getMenuItemTagContainer(menuCategory.getTitle(), menuItem, menuTagsInCategory);
                targetTag.getMenuItems().add(menuItem);
                if (!menuTagsInCategory.contains(targetTag)) menuTagsInCategory.add(targetTag);
            }
            allTagContainers.put(menuCategory.getTitle(), menuTagsInCategory);
        }

        //add all tags from all menuItems
        ArrayList<MenuItemTagContainer> allMenuTags = new ArrayList<>();

        for (MenuItem menuItem : menuItems) {
            MenuItemTagContainer target = getMenuItemTagContainer("All", menuItem, allMenuTags);
            target.getMenuItems().add(menuItem);
            if (!allMenuTags.contains(target)) allMenuTags.add(target);
        }

        allTagContainers.put("All", allMenuTags);


        model.addAttribute("itemsByMenuTags", allTagContainers);

        //I like the look of the texas roadhouse navigation for the menu, that and the dennys

        return "menu";
    }

    private static MenuItemTagContainer getMenuItemTagContainer(String menuCategory, MenuItem menuItem, ArrayList<MenuItemTagContainer> menuTagsInCategory) {
        MenuItemTagContainer targetTag = null;
        for (MenuItemTagContainer tagContainer : menuTagsInCategory) {
            if (tagContainer.getTagName().equals(menuItem.getTag())) {
                targetTag = tagContainer;
                break;
            }
        }

        if (targetTag == null) {
            targetTag = new MenuItemTagContainer(new ArrayList<>(), menuItem.getTag(), menuCategory);
        }
        return targetTag;
    }


}
