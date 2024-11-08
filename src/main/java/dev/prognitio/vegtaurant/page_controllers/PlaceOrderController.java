package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PlaceOrderController {

    private final RestaurantLocationRepository locationRepository;
    private final AuthTokensRepository authTokensRepository;

    public PlaceOrderController(RestaurantLocationRepository locationRepository, AuthTokensRepository authTokensRepository) {
        this.locationRepository = locationRepository;
        this.authTokensRepository = authTokensRepository;
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
}
