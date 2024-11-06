package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.MenuItemRepository;
import dev.prognitio.vegtaurant.data_storage.RestaurantLocationRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PlaceOrderController {

    private final RestaurantLocationRepository locationRepository;

    public PlaceOrderController(RestaurantLocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @GetMapping("/order")
    public String placeOrder(Model model) {
        model.addAttribute("locations", locationRepository.findAll());
        return "order";
    }
}
