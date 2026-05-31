package example.com.dto;

public record LoginResponse(
        boolean success,
        String message,
        String token,
        String role
) {
}
