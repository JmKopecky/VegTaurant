package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.VegtaurantApplication;
import dev.prognitio.vegtaurant.data_storage.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

import javax.naming.AuthenticationException;
import java.time.Instant;
import java.util.*;

@Controller
public class HomeController {


    private final MenuItemRepository menuItemRepository;
    private final MenuCategoryRepository menuCategoryRepository;
    private final AccountRepository accountRepository;
    private final FeaturedItemRepository featuredItemRepository;
    private final ProductRatingRepository productRatingRepository;
    private final RestaurantLocationRepository restaurantLocationRepository;
    private final PlacedOrderRepository placedOrderRepository;
    private final AuthTokensRepository authTokensRepository;

    public HomeController(MenuItemRepository menuItemRepository, MenuCategoryRepository menuCategoryRepository, AccountRepository accountRepository, FeaturedItemRepository featuredItemRepository, ProductRatingRepository productRatingRepository, RestaurantLocationRepository restaurantLocationRepository, PlacedOrderRepository placedOrderRepository, AuthTokensRepository authTokensRepository) {
        //if encountering errors, make sure to drop both tables first.
        this.menuItemRepository = menuItemRepository;
        this.menuCategoryRepository = menuCategoryRepository;
        this.accountRepository = accountRepository;
        this.featuredItemRepository = featuredItemRepository;
        this.productRatingRepository = productRatingRepository;
        this.restaurantLocationRepository = restaurantLocationRepository;
        this.placedOrderRepository = placedOrderRepository;
        this.authTokensRepository = authTokensRepository;
        VegtaurantApplication.doDatabaseTestCase(menuCategoryRepository, menuItemRepository, featuredItemRepository, productRatingRepository, accountRepository, restaurantLocationRepository, placedOrderRepository);
    }


    @GetMapping("/")
    public String home(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;

        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
            model.addAttribute("headerpicturelink", acc.getImageUrl());
        } catch (AuthenticationException e) {
            model.addAttribute("headerpicturelink", "/images/default-avatar-icon.jpg");
        }



        //top half rated items
        ArrayList<MenuItem> topHalfMenuItems = new ArrayList<>();
        menuItemRepository.findAll().forEach(topHalfMenuItems::add);
        MenuItem.sort(topHalfMenuItems, "rating");
        if (topHalfMenuItems.size() > 8) {
            model.addAttribute("tophalfmenuitems", topHalfMenuItems.subList(0, topHalfMenuItems.size() / 2));
        } else {
            model.addAttribute("tophalfmenuitems", topHalfMenuItems);
        }

        //featured item deal
        FeaturedItem targetDeal = FeaturedItem.sort((ArrayList<FeaturedItem>) featuredItemRepository.findAll()).getFirst();
        MenuItem targetItem = null;
        for (MenuItem item : menuItemRepository.findAll()) {
            if (item.getDeal() != null && item.getDeal().equals(targetDeal)) {
                targetItem = item;
                break;
            }
        }
        model.addAttribute("featureditem", targetItem);

        //if day is monday, have a site-wide discount
        Calendar cal = Calendar.getInstance();
        cal.setTime(Date.from(Instant.now()));
        boolean isMonday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY;
        model.addAttribute("sitewidedaydiscount", isMonday);

        //top n ratings
        int numRatings = 4;
        ArrayList<ProductRating> ratings = (ArrayList<ProductRating>) productRatingRepository.findAll();
        Collections.shuffle(ratings);
        ratings.sort(Comparator.comparing(ProductRating::getRating));
        Collections.reverse(ratings);
        model.addAttribute("topratings", ratings.subList(0, Math.min(ratings.size(), numRatings)));




        return "home";
    }
}
