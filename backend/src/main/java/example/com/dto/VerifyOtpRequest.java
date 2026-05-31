package example.com.dto;

public record VerifyOtpRequest(
        String email,
        String otp
) {

}
