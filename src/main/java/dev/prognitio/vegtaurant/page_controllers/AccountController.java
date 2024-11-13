package dev.prognitio.vegtaurant.page_controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.prognitio.vegtaurant.data_storage.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.util.WebUtils;

import java.util.ArrayList;
import java.util.Arrays;

@Controller
public class AccountController {

    private final AuthTokensRepository authTokensRepository;
    private final AccountRepository accountRepository;
    private final ProductRatingRepository productRatingRepository;
    public AccountController(AuthTokensRepository authTokensRepository, AccountRepository accountRepository, ProductRatingRepository productRatingRepository) {
        this.authTokensRepository = authTokensRepository;
        this.accountRepository = accountRepository;
        this.productRatingRepository = productRatingRepository;
    }

    @GetMapping("/account")
    public String auth(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) throws Exception {
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
        if (acc == null) {
            System.out.println(AuthTokens.retrieveWithSessionToken(authTokensRepository, sessionToken));
            return "redirect:/signon";
        }
        model.addAttribute("account", acc);


        ArrayList<ProductRating> ratings = new ArrayList<>();
        for (ProductRating rating : productRatingRepository.findAll()) {
            if (rating.getReviewer().equals(acc)) {
                ratings.add(rating);
            }
        }
        model.addAttribute("ratings", ratings);


        return "account";
    }


    @PostMapping("/account")
    public String changeAccountSettings(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken, @RequestBody String data) throws Exception {
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


        if (acc == null) {
            System.out.println(AuthTokens.retrieveWithSessionToken(authTokensRepository, sessionToken));
            return "redirect:/signon";
        }


        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(data);
            if (node.has("name")) {
                acc.setName(node.get("name").asText());
            }
            if (node.has("email")) {
                acc.setEmail(node.get("email").asText());
            }
            if (node.has("imageurl")) {
                acc.setImageUrl(node.get("imageurl").asText());
            }
            if (node.has("phone")) {
                acc.setPhone(node.get("phone").asText());
            }
            if (node.has("address")) {
                acc.setAddress(node.get("address").asText());
            }
            if (node.has("city")) {
                acc.setCity(node.get("city").asText());
            }
            if (node.has("state")) {
                acc.setState(node.get("state").asText());
            }
            if (node.has("zip")) {
                acc.setZip(node.get("zip").asText());
            }
            if (node.has("country")) {
                acc.setCountry(node.get("country").asText());
            }
            if (node.has("cardnumber")) {
                acc.setCardNumber(node.get("cardnumber").asText());
            }
            if (node.has("cardexpirationdate")) {
                acc.setExpirationDate(node.get("cardexpirationdate").asText());
            }
            if (node.has("cardsecuritycode")) {
                acc.setSecurityCode(node.get("cardsecuritycode").asText());
            }
            if (node.has("cardusername")) {
                acc.setCardUserName(node.get("cardusername").asText());
            }

        } catch (Exception e) {
            System.out.println(e);
        }


        accountRepository.save(acc);
        model.addAttribute("account", acc);

        return "account";
    }
}
