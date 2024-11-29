package dev.prognitio.vegtaurant.page_controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.prognitio.vegtaurant.data_storage.Account;
import dev.prognitio.vegtaurant.data_storage.AccountRepository;
import dev.prognitio.vegtaurant.data_storage.AuthTokens;
import dev.prognitio.vegtaurant.data_storage.AuthTokensRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.naming.AuthenticationException;
import javax.naming.TimeLimitExceededException;
import java.util.Timer;
import java.util.TimerTask;

@Controller
public class SignOnController {
    private final AccountRepository accountRepository;
    private final AuthTokensRepository authTokensRepository;
    public SignOnController(AccountRepository accountRepository, AuthTokensRepository authTokensRepository) {
        this.accountRepository = accountRepository;
        this.authTokensRepository = authTokensRepository;
    }

    @GetMapping("/signon")
    public String signOn(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken) {

        Account acc;

        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
            model.addAttribute("headerpicturelink", acc.getImageUrl());
        } catch (AuthenticationException e) {
            model.addAttribute("headerpicturelink", "/images/default-avatar-icon.jpg");
        }

        System.out.println("returning signon");
        return "signon";
    }


    @PostMapping("/signon")
    public String accountSignOn(Model model, @RequestBody String data, HttpServletResponse response, HttpServletRequest request) throws TimeLimitExceededException {
        System.out.println("SIGNONPOST");
        System.out.println(data);

        Account account;
        boolean shouldSave;
        String ipAddress = request.getRemoteAddr();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(data);
            shouldSave = node.get("newaccount").asBoolean();
            System.out.println(shouldSave);
            if (!shouldSave) {
                //authenticate sign on.
                account = Account.authenticate(accountRepository, node.get("email").asText(), node.get("password").asText());
            } else {
                account = new Account();
                account.setEmail(node.get("email").asText());
                account.setPhone(node.get("phone").asText());
                account.setPassword(node.get("password").asText()); //TODO hash passwords
                account.setRewardPoints(0);
                account.setName(node.get("name").asText());
                account.setAddress(node.get("address").asText());
                account.setCity(node.get("city").asText());
                account.setState(node.get("state").asText());
                account.setZip(node.get("zip").asText());
                account.setCountry(node.get("country").asText());
                account.setCardNumber(node.get("cardnumber").asText());
                account.setExpirationDate(node.get("cardexpirationdate").asText());
                account.setSecurityCode(node.get("cardsecuritycode").asText());
                account.setCardUserName(node.get("cardusername").asText());
                account.setImageUrl("/images/default-avatar-icon.jpg");
            }
        } catch (Exception e) {
            System.out.println(e);
            return "redirect:/error";
        }

        if (shouldSave) {
            accountRepository.save(account);
        }

        //create session token.
        AuthTokens sessionToken = new AuthTokens();
        try {
            sessionToken.setToken(AuthTokens.generateUniqueToken(authTokensRepository));
        } catch (TimeLimitExceededException e) {
            throw new TimeLimitExceededException();
        }
        sessionToken.setAccount(account);
        for (AuthTokens token : authTokensRepository.findAll()) {
            if (token.getAccount().equals(account)) {
                authTokensRepository.delete(token);
            }
        }
        sessionToken.setIpAddress(ipAddress);
        authTokensRepository.save(sessionToken);


        Timer timer = new Timer();
        timer.schedule(new ScheduleAuthTokenRemoval(sessionToken.getToken(), authTokensRepository), 60 * 60 * 1000);

        Cookie cookie = new Cookie("sessiontoken", sessionToken.getToken());
        cookie.setMaxAge(60*60);
        response.addCookie(cookie);

        model.addAttribute("account", account);
        return "account";
    }


    private class ScheduleAuthTokenRemoval extends TimerTask {
        private final String target;
        private final AuthTokensRepository rep;

        ScheduleAuthTokenRemoval(String target, AuthTokensRepository rep) {
            this.target = target;
            this.rep = rep;
        }

        @Override
        public void run() {
            AuthTokens.deleteSessionToken(rep, target);
        }
    }
}
