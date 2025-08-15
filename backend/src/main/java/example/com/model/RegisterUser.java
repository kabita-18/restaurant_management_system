package example.com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name = "register_user")
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen", initialValue = 3000)
public class RegisterUser {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "port_gen")
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String repeatpassword;

    @Column(nullable = false)
    private String role;  

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRepeatpassword() { return repeatpassword; }
    public void setRepeatpassword(String repeatpassword) { this.repeatpassword = repeatpassword; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    
    public RegisterUser() {
        super();
    }

    public RegisterUser(Long id, String username, String email, String password, String repeatpassword, String role) {
        super();
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.repeatpassword = repeatpassword;
        this.role = role;
    }

    @Override
    public String toString() {
        return "RegisterUser [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
                + ", repeatpassword=" + repeatpassword + ", role=" + role + "]";
    }
	
}
