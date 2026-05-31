package example.com.dto;

import java.time.LocalDateTime;

public record ErrorResponse(
        LocalDateTime localDateTime,
        int status,
        String error,
        String message,
        String path
        ) {
}
