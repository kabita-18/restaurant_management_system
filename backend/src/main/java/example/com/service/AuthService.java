package example.com.service;

import example.com.dto.AuthResponse;
import example.com.dto.LoginRequest;
import example.com.dto.LoginResponse;
import example.com.dto.RegisterRequest;
import jakarta.validation.Valid;

public interface AuthService {
    AuthResponse register(@Valid RegisterRequest request);

    LoginResponse login(@Valid LoginRequest request);
}
