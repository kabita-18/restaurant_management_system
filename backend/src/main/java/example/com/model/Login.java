package example.com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class Login {
	
	@Id
	@Column(nullable = false,unique = true)
	private String useremail;
	private String password;
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "Login [useremail=" + useremail+"]";
	}
	public Login(String useremail, String password) {
		super();
		this.useremail = useremail;
		this.password = password;
	}
	public Login() {
		super();
	}
	
	
}
