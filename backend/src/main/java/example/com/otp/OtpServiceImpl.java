package example.com.otp;

import example.com.JPA.UserRepository;
import example.com.email.EmailService;
import example.com.exception.InvalidOtpException;
import example.com.exception.UserNotFoundException;
import example.com.model.RegisterUser;
import example.com.utils.EmailUtils;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService{
    private static final Logger logger =
            LoggerFactory.getLogger(OtpServiceImpl.class);

    private final RedisTemplate<String, Object> redisTemplate;
    private final EmailService emailService;
    private final UserRepository userRepository;

    @Override
    public void generateAndSendOtp(String email) {
        //Delete old OTP first
        email = EmailUtils.normalize(email);
        redisTemplate.delete(email);

        //Generate 6-digit OTP
       String otp = String.valueOf(100000 + new Random().nextInt(900000));
        logger.info("Sending OTP email to {} ",email);


        //Store Otp in Redis
        redisTemplate.opsForValue().set(email,otp, Duration.ofMinutes(10) );

        //Send Email
        emailService.sendOtpEmail(email, otp);

        logger.info("OTP email sent to {} ",email);
    }

    @Override
    public void verifyOtpAndActiveUser(String email, String otp) {
        email = EmailUtils.normalize(email);
        Object storedOtp = redisTemplate.opsForValue().get(email);

        //OTP missing or expired
        if(storedOtp == null) {
            throw new InvalidOtpException("Otp expired or Not found");
        }

        //OTP mismatch
        if(!storedOtp.toString().equals(otp)){
            throw new InvalidOtpException("Invalid Otp");
        }
        // Find user
        RegisterUser user = userRepository.findOptionalByEmail(email).orElseThrow(
                () ->  new UserNotFoundException("User not found")
        );
        logger.info(
                "Stored OTP: {}, Incoming OTP: {}",
                storedOtp,
                otp
        );
        //Activate user
        user.setVerified(true);

        userRepository.save(user);

        //Delete OTP after success
        redisTemplate.delete(email);

        logger.info("OTP verified successfully for email: {}", email);

    }
}
