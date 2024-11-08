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

import java.time.LocalDateTime;

@Controller
public class PlaceOrderController {

    private final RestaurantLocationRepository locationRepository;
    private final AuthTokensRepository authTokensRepository;
    private final AccountRepository accountRepository;
    private final OrderRepository orderRepository;

    public PlaceOrderController(RestaurantLocationRepository locationRepository, AuthTokensRepository authTokensRepository, AccountRepository accountRepository, OrderRepository orderRepository) {
        this.locationRepository = locationRepository;
        this.authTokensRepository = authTokensRepository;
        this.accountRepository = accountRepository;
        this.orderRepository = orderRepository;
    }

    @GetMapping("/order")
    public String placeOrder(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;
        String ip = request.getRemoteAddr();

        if (!sessionToken.equals("null")) {
            try {
                AuthTokens token = AuthTokens.getBySessionToken(authTokensRepository, sessionToken);
                if (ip.equals(token.getIpAddress())) {
                    acc = AuthTokens.retrieveWithSessionToken(authTokensRepository, sessionToken);
                    model.addAttribute("account", acc);
                } else { //connected with different ip address, force to sign in again
                    AuthTokens.deleteSessionToken(authTokensRepository, token.getToken()); //remove token
                    model.addAttribute("account", "noaccount");
                }

            } catch (Exception e) {
                model.addAttribute("account", "noaccount");
            }

        } else {
            model.addAttribute("account", "noaccount");
        }


        model.addAttribute("locations", locationRepository.findAll());

        return "order";
    }



    @PostMapping("/order")
    public ResponseEntity<String> placeOrderToAccount(Model model, @RequestBody String data, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {
        Account acc;
        String ip = request.getRemoteAddr();


        if (sessionToken.equals("null")) {
            return new ResponseEntity<>("failed", HttpStatus.OK);
        }

        try {
            AuthTokens token = AuthTokens.getBySessionToken(authTokensRepository, sessionToken);
            if (ip.equals(token.getIpAddress())) {
                acc = AuthTokens.retrieveWithSessionToken(authTokensRepository, sessionToken);
            } else { //connected with different ip address, force to sign in again
                AuthTokens.deleteSessionToken(authTokensRepository, token.getToken()); //remove token
                return new ResponseEntity<>("failed", HttpStatus.OK);
            }

        } catch (Exception e) {
            return new ResponseEntity<>("failed", HttpStatus.OK);
        }

        PlacedOrder order = new PlacedOrder();
        order.setAccount(acc);
        order.setCartString(data.substring(data.indexOf("_")));
        order.setOrderDate(LocalDateTime.now());
        order.setEstimatedDeliveryTime(Integer.parseInt(data.substring(0, data.indexOf("_"))));
        orderRepository.save(order);

        System.out.println(data);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }

}
