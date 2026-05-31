package example.com.mapper;

import example.com.dto.RegisterRequest;
import example.com.model.RegisterUser;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {


    public RegisterUser toEntity(RegisterRequest registerRequest) {

        RegisterUser user = new RegisterUser();
        user.setUsername(registerRequest.username().trim());
        user.setEmail(registerRequest.email().trim().toLowerCase());
        return user;

    }

}
