package example.com.email;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements  EmailService {
    private static final Logger logger =
            LoggerFactory.getLogger(EmailServiceImpl.class);
    @Override
    public void sendOtpEmail(String email, String otp) {
        logger.info("Sending OTP {} to email {}", otp, email);
    }
}
