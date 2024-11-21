package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.naming.AuthenticationException;
import java.time.LocalDateTime;

@Controller
public class PlaceOrderController {

    private final RestaurantLocationRepository locationRepository;
    private final AuthTokensRepository authTokensRepository;
    private final PlacedOrderRepository placedOrderRepository;

    public PlaceOrderController(RestaurantLocationRepository locationRepository, AuthTokensRepository authTokensRepository, PlacedOrderRepository placedOrderRepository) {
        this.locationRepository = locationRepository;
        this.authTokensRepository = authTokensRepository;
        this.placedOrderRepository = placedOrderRepository;
    }


    @GetMapping("/order")
    public String placeOrder(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;

        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
            model.addAttribute("headerpicturelink", acc.getImageUrl());
            model.addAttribute("account", acc);
        } catch (AuthenticationException e) {
            model.addAttribute("headerpicturelink", "/images/default-avatar-icon.jpg");
            model.addAttribute("account", "noaccount");
        }

        model.addAttribute("locations", locationRepository.findAll());

        return "order";
    }



    @PostMapping("/order")
    public ResponseEntity<String> placeOrderToAccount(Model model, @RequestBody String data, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;

        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("failed", HttpStatus.OK);
        }
        model.addAttribute("headerpicturelink", acc.getImageUrl());


        PlacedOrder order = new PlacedOrder();
        order.setAccount(acc);
        order.setCartString(data.substring(data.indexOf("_")));
        order.setOrderDate(LocalDateTime.now());
        order.setEstimatedDeliveryTime(Integer.parseInt(data.substring(0, data.indexOf("_"))));
        placedOrderRepository.save(order);

        System.out.println(data);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
