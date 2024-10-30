package dev.prognitio.vegtaurant.page_controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewCartController {


    @GetMapping("/cart")
    public String viewCart(Model model) {
        return "viewcart";
    }


}
