package dev.prognitio.vegtaurant.page_controllers;

import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.prognitio.vegtaurant.data_storage.*;
import dev.prognitio.vegtaurant.json_models.BatchReviewItem;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.naming.AuthenticationException;
import java.util.List;

@Controller
public class RatingsController {

    private final AuthTokensRepository authTokensRepository;
    private final ProductRatingRepository productRatingRepository;
    private final MenuItemRepository menuItemRepository;
    public RatingsController(AccountRepository accountRepository, AuthTokensRepository authTokensRepository, ProductRatingRepository productRatingRepository, MenuItemRepository menuItemRepository) {
        this.authTokensRepository = authTokensRepository;
        this.productRatingRepository = productRatingRepository;
        this.menuItemRepository = menuItemRepository;
    }


    @PostMapping("/addratings")
    public ResponseEntity<String> placeOrderToAccount(Model model, HttpServletRequest request, @CookieValue(value = "sessiontoken", defaultValue = "null") String sessionToken, @RequestBody String data) {

        Account acc;
        try {
            acc = AccountController.retrieveAccountFromToken(sessionToken, request.getRemoteAddr(), authTokensRepository);
        } catch (AuthenticationException e) {
            return new ResponseEntity<>("Sign in to create review.", HttpStatus.UNAUTHORIZED);
        }



        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode node = mapper.readTree(data);
            if (node.has("ratings") && node.get("ratings").asBoolean()) {
                String ratingsBatchString = node.get("batchedratings").asText();
                System.out.println(ratingsBatchString);
                ObjectMapper batchMapper = new ObjectMapper();
                BatchReviewItem[] batchedItems = batchMapper.readValue(ratingsBatchString, BatchReviewItem[].class);
                System.out.println("HI");
                for (BatchReviewItem bi : batchedItems) {
                    ProductRating rating = new ProductRating();
                    rating.setReviewer(acc);
                    rating.setMessage(bi.getMessage());
                    rating.setRating(bi.getValue());
                    MenuItem toAdd = null;
                    //resolve menu item from name
                    for (MenuItem item : menuItemRepository.findAll()) {
                        if (item.getLabel().equals(bi.getName())) {
                            toAdd = item;
                            break;
                        }
                    }
                    if (toAdd != null) {
                        rating.setProduct(toAdd);
                    } else {
                        return new ResponseEntity<>("Failed to resolve target item.", HttpStatus.BAD_REQUEST);
                    }
                    productRatingRepository.save(rating);

                }
            }

        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>("Failed to add rating.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>("Success!", HttpStatus.OK);
    }
}
