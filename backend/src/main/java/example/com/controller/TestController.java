package example.com.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/profile")
    public String profile(Authentication authentication) {
        System.out.println(authentication);
        return "Welcome " + authentication.getName()
                + ", JWT Authentication Successful";

    }
}
