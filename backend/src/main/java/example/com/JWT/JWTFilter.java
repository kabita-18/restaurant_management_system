package example.com.JWT;

import java.io.IOException;
import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private static final Logger logger =
            LoggerFactory.getLogger(JWTFilter.class);

    private final JWTUtilityTokenProvider jwtUtil;

    public JWTFilter(
            JWTUtilityTokenProvider jwtUtil
    ) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        String jwt = null;

        String email = null;

        try {

            // Check Bearer Token
            if (authHeader != null &&
                    authHeader.startsWith("Bearer ")) {

                jwt = authHeader.substring(7);

                // Validate JWT
                if (jwtUtil.isTokenValid(jwt)) {

                    email =
                            jwtUtil.extractUsername(jwt);

                    String role =
                            jwtUtil.extractRole(jwt);

                    logger.info(
                            "JWT validated for user: {}",
                            email
                    );

                    UsernamePasswordAuthenticationToken authToken =
                            new UsernamePasswordAuthenticationToken(
                                    email,
                                    null,
                                    Collections.singletonList(
                                            new SimpleGrantedAuthority(
                                                    "ROLE_" + role
                                            )
                                    )
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    // Set Authentication
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);
                }
            }

        } catch (Exception e) {

            logger.error(
                    "JWT Authentication failed: {}",
                    e.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }
}