package dev.prognitio.vegtaurant.page_controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignOnController {
    @GetMapping("/signon")
    public String signOn(Model model) {
        return "signon";
    }
}
