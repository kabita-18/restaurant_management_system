package example.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "example.com")
public class CapstonProjectDeliciousBytesApplication {

    public static void main(String[] args) {
        SpringApplication.run(CapstonProjectDeliciousBytesApplication.class, args);
        System.out.println("Server Started...");

    }
}