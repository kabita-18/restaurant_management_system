package example.com.JWT;

import java.io.IOException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter{
	@Autowired
	private JWTUtilityTokenProvider jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		final String authHeader = request.getHeader("Authorization");
		String email = null;
		String jwt = null;

		if (authHeader != null && authHeader.startsWith("Bearer ")) {
		    jwt = authHeader.substring(7);
		    if (jwtUtil.isTokenValid(jwt)) {
		        email = jwtUtil.extractUsername(jwt); 
		        String role = jwtUtil.extractRole(jwt);
		        
		        UsernamePasswordAuthenticationToken authToken =
		            new UsernamePasswordAuthenticationToken(
		                email, null, Collections.singletonList(new SimpleGrantedAuthority(role))
		            );

		        SecurityContextHolder.getContext().setAuthentication(authToken);
		    }
		}
		System.out.println("🔐 JWTFilter invoked");
		System.out.println("Authorization Header: " + authHeader);
		System.out.println("Extracted Email from Token: " + email);

		 filterChain.doFilter(request, response);
		 


		
	}

}
