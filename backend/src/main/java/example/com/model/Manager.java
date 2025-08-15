package example.com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
@SequenceGenerator(name = "port_gen", sequenceName = "port_gen",  initialValue = 3000)
public class Manager {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO,generator="port_gen")
	private int mid;
	@Column(unique = true, nullable = false)
	private String mname;
	@Column(unique = true, nullable = false)
	private String email;
	private String status;
	private String password;
	@Override
	public String toString() {
		return "Manager [mid=" + mid + ", mname=" + mname + ", email=" + email + ", status=" + status + ", password="
				+ password + "]";
	}
	public int getMid() {
		return mid;
	}
	public void setMid(int mid) {
		this.mid = mid;
	}
	public String getMname() {
		return mname;
	}
	public void setMname(String mname) {
		this.mname = mname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Manager(String mname, String email, String status) {
		super();
		this.mname = mname;
		this.email = email;
		this.status = status;	
	}
	public Manager() {
		super();
	}
	
	
	
	
	
}
