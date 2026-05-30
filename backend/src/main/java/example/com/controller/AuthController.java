package example.com.controller;

import example.com.dto.*;
import example.com.otp.OtpService;
import example.com.service.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;

@RestController
@RequestMapping("/deliciousbyte/auth")
@AllArgsConstructor
@Validated
public class AuthController {

    private static final Logger logger =
            (Logger) LoggerFactory.getLogger(AuthController.class);
    private final AuthService authService;
    private final OtpService otpService;


    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerUser(
            @Valid @RequestBody RegisterRequest request){

        logger.info("Registration request received for email: {}", request.email());
        AuthResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOtp(@RequestBody VerifyOtpRequest request){
        boolean isVerified =
                otpService.verifyOtpAndActiveUser(request.email(),  request.otp());
        if(!isVerified){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid OTP");
        }
        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<String> respondOtp(@RequestBody ResendOtpRequest request){
        otpService.generateAndSendOtp(request.email());
        return ResponseEntity.ok("OTP generated successfully");
    }


    @PostMapping
    public ResponseEntity<LoginResponse> loginUser(
            @Valid @RequestBody LoginRequest request){
        logger.info("Login request received for email: {}", request.email());

        LoginResponse response = authService.login(request);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }


}
