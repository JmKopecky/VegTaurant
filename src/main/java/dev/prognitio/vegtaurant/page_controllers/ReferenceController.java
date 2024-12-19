package dev.prognitio.vegtaurant.page_controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReferenceController {



    @GetMapping("/references")
    public String references() {
        return "references";
    }

}
