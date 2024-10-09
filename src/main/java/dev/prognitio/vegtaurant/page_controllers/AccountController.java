package dev.prognitio.vegtaurant.page_controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.prognitio.vegtaurant.data_storage.Account;
import dev.prognitio.vegtaurant.data_storage.AccountRepository;
import dev.prognitio.vegtaurant.data_storage.AuthTokens;
import dev.prognitio.vegtaurant.data_storage.AuthTokensRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.WebUtils;

import java.util.Arrays;

@Controller
public class AccountController {

    private final AuthTokensRepository authTokensRepository;
    public AccountController(AuthTokensRepository authTokensRepository) {
        this.authTokensRepository = authTokensRepository;
    }

    @GetMapping("/account")
    public String auth(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {
        Account acc;
        String ip = request.getRemoteAddr();


        if (sessionToken.equals("null")) {
            return "redirect:/signon";
        }

        try {
            AuthTokens token = AuthTokens.getBySessionToken(authTokensRepository, sessionToken);
            if (ip.equals(token.getIpAddress())) {
                acc = AuthTokens.retrieveWithSessionToken(authTokensRepository, sessionToken);
            } else { //connected with different ip address, force to sign in again
                AuthTokens.deleteSessionToken(authTokensRepository, token.getToken()); //remove token
                return "redirect:/signon";
            }

        } catch (Exception e) {
            return "redirect:/signon";
        }
        model.addAttribute("account", acc);

        return "account";
    }
}
