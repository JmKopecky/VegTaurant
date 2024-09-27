package dev.prognitio.vegtaurant.page_controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.prognitio.vegtaurant.data_storage.Account;
import dev.prognitio.vegtaurant.data_storage.AccountRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class SignOnController {
    private final AccountRepository accountRepository;
    public SignOnController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping("/signon")
    public String signOn(Model model) {
        return "signon";
    }


    @PostMapping("/signon")
    public String accountSignOn(Model model, @RequestBody String data) {
        System.out.println(data);

        Account account = new Account();
        boolean shouldSave = true;

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(data);
            account.setEmail(node.get("email").asText());
            account.setPhone(node.get("phone").asText());
            account.setPassword(node.get("password").asText()); //TODO hash passwords
            account.setRewardPoints(0);
            account.setFirstName(node.get("firstname").asText());
            account.setLastName(node.get("lastname").asText());
            account.setAddressLine1(node.get("addressline1").asText());
            account.setAddressLine2(node.get("addressline2").asText());
            account.setCity(node.get("city").asText());
            account.setState(node.get("state").asText());
            account.setZip(node.get("zip").asText());
            account.setCountry(node.get("country").asText());
            account.setCardNumber(node.get("cardnumber").asText());
            account.setExpirationDate(node.get("cardexpirationdate").asText());
            account.setSecurityCode(node.get("cardsecuritycode").asText());
            account.setCardUserName(node.get("cardusername").asText());
        } catch (JsonProcessingException e) {
            shouldSave = false;
            throw new RuntimeException(e);
        }
        if (shouldSave) {
            accountRepository.save(account);
        }

        return "signon";
    }
}
