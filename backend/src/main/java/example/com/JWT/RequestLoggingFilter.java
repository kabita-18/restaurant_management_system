package example.com.JWT;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

public class RequestLoggingFilter implements Filter{
	 @Override
	    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	            throws IOException, ServletException {

	        HttpServletRequest req = (HttpServletRequest) request;

	        System.out.println("📥 Incoming Request:");
	        System.out.println("👉 Method: " + req.getMethod());
	        System.out.println("👉 URI: " + req.getRequestURI());
	        System.out.println("👉 Headers:");
	        req.getHeaderNames().asIterator().forEachRemaining(
	            name -> System.out.println("   - " + name + ": " + req.getHeader(name))
	        );

	        chain.doFilter(request, response); // Continue to the next filter
	    }
}
