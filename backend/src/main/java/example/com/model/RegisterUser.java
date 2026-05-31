package example.com.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "register_user")
@SequenceGenerator(
        name = "port_gen",
        sequenceName = "port_gen",
        initialValue = 3000
)
public class RegisterUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "port_gen")
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    // NEW FIELDS

    @Column(nullable = false)
    private boolean verified = false;


    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors

    public RegisterUser() {
    }

    public RegisterUser(Long id,
                        String username,
                        String email,
                        String password,
                        String role,
                        boolean verified,
                        LocalDateTime createdAt) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.verified = verified;
        this.createdAt = createdAt;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

}