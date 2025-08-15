
package example.com.capstonprojectdeliciousbytes;

import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import jakarta.servlet.http.HttpServletRequest;

@SpringBootApplication
@ComponentScan("example.com")
@EntityScan("example.com.model")
@EnableJpaRepositories("example.com.jpa")
@Configuration
@EnableWebMvc
public class CapstonProjectDeliciousBytesApplication {

	public static void main(String[] args) {
		SpringApplication.run(CapstonProjectDeliciousBytesApplication.class, args);
		System.out.println("Server Start....");
	}
	
	

}
