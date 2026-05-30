package example.com.otp;

public interface OtpService {
    void generateAndSendOtp(String email);

//    boolean verifyOtp(String email, String otp);

    boolean verifyOtpAndActiveUser(String email, String otp);
}
