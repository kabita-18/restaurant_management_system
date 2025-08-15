package example.com.JWT;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTUtilityTokenProvider {
	 @Value("${jwt.secret}")
	 private String secret;

	  @Value("${jwt.expiration}")
	  private long expiration;
	  private Key getSigningKey() {
		    return Keys.hmacShaKeyFor(secret.getBytes());
		}
	  
	  public String generateToken(String email, String role) {
		 

	        return Jwts.builder()
	                .subject(email)
	                .claim("role", role)
	                .issuedAt(new Date())
	                .expiration(new Date(System.currentTimeMillis() + expiration))
	                .signWith(getSigningKey())
	                .compact();
	    }
	  
	  public Claims extractClaims(String token) {
	        return Jwts.parser()
	                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
	                .build()
	                .parseSignedClaims(token)
	                .getPayload();
	    }
	  
	  public String extractUsername(String token) {
	        return extractClaims(token).getSubject();
	    }
	  
	  public String extractRole(String token) {
	        return extractClaims(token).get("role", String.class);
	    }
	  
	  public boolean isTokenValid(String token) {
	        try {
	            return !extractClaims(token).getExpiration().before(new Date());
	        } catch (Exception e) {
	            return false;
	        }
	    }

}
