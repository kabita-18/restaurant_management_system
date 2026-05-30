package example.com.service;

import example.com.JPA.UserRepository;
import example.com.JWT.JWTUtilityTokenProvider;
import example.com.dto.AuthResponse;
import example.com.dto.LoginRequest;
import example.com.dto.LoginResponse;
import example.com.dto.RegisterRequest;
import example.com.mapper.UserMapper;
import example.com.model.RegisterUser;
import example.com.otp.OtpService;
import example.com.utils.EmailUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements  AuthService {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthServiceImpl.class);

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtilityTokenProvider jwtUtil;
    private final OtpService otpService;


    @Override
    public AuthResponse register(RegisterRequest request) {
        logger.info("Starting registration process for email: {}", request.email());
        EmailUtils.normalize(request.email());
        if(userRepository.findOptionalByEmail(request.email()).isPresent()){
            logger.warn("User with email {} already exists", request.email());
            return new AuthResponse(false, "User with email already exists");
        }
        RegisterUser user = userMapper.toEntity(request);
        logger.info("Password received: {}", request.password());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole("USER");
        user.setVerified(false);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
        otpService.generateAndSendOtp(user.getEmail());

        logger.info("Registration process for email: {}", request.email());
        return new AuthResponse(true, "User has been registered successfully");
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        String email = EmailUtils.normalize(request.email());
        logger.info("login attempt for email:{}", email);
        RegisterUser user = userRepository.findOptionalByEmail(email).orElse(null);
        if(user == null){
            logger.warn("User with email {} not found", email);
            return new LoginResponse(false, "User with email not found", null, null);
        }

        //Verify password using BCrypt
        boolean passwordMatches = passwordEncoder.matches(request.password(), user.getPassword());
        if(!passwordMatches){
            logger.warn("Login failed. Password does not match : {}", request.email());
            return new LoginResponse(false, "Login failed, Invalid email or password", null, null);
        }
        //Check email verification
        if(!user.isVerified()){
            logger.warn("Login failed. User is not verified: {}", email);
            return new LoginResponse(false, "Login failed, Email not verified, Please verify your email first", null, null);
        }

        //Generate JWT Token
        String token =
                jwtUtil.generateToken(user.getEmail(), user.getRole());
        logger.info("JWT token generated for email: {}", request.email());

        logger.info("Login process for email: {}", request.email());
        return new LoginResponse(true, "Login successful", token, user.getRole());
    }


}
