package dev.prognitio.vegtaurant.page_controllers;

import dev.prognitio.vegtaurant.data_storage.Account;
import dev.prognitio.vegtaurant.data_storage.AuthTokensRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

import javax.naming.AuthenticationException;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

@Controller
public class ViewCartController {

    private final AuthTokensRepository authTokensRepository;

    public ViewCartController(AuthTokensRepository authTokensRepository) {
        this.authTokensRepository = authTokensRepository;
    }


    @GetMapping("/cart")
    public String viewCart(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;

        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
            model.addAttribute("headerpicturelink", acc.getImageUrl());
        } catch (AuthenticationException e) {
            model.addAttribute("headerpicturelink", "/images/default-avatar-icon.jpg");
        }

        //if day is monday, have a site-wide discount
        Calendar cal = Calendar.getInstance();
        cal.setTime(Date.from(Instant.now()));
        boolean isMonday = cal.get(Calendar.DAY_OF_WEEK) == Calendar.MONDAY;
        if (isMonday) {
            model.addAttribute("defaultcode", "MONDAY");
        } else {
            model.addAttribute("defaultcode", "");
        }

        return "viewcart";
    }


}
