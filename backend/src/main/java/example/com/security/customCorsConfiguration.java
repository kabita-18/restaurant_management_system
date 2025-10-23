package example.com.security;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class customCorsConfiguration implements CorsConfigurationSource {

    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:5173")); // Your frontend URL
//        http://delicious-bytes.s3-website.eu-north-1.amazonaws.com/
        config.setAllowedOrigins(List.of(
                "http://localhost:5173",
                "http://delicious-bytes.s3-website.eu-north-1.amazonaws.com"
            ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return config;
    }

    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", getCorsConfiguration(null));
        return source;
    }
}
