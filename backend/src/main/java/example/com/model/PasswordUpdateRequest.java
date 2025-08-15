package example.com.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;


public class PasswordUpdateRequest {

    private String currentPassword;
    private String newPassword;
	
	
	public String getCurrentPassword() {
		return currentPassword;
	}
	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	@Override
	public String toString() {
		return "PasswordUpdateRequest [currentPassword=" + currentPassword + ", newPassword="
				+ newPassword + "]";
	}
	public PasswordUpdateRequest(String currentPassword, String newPassword) {
		super();
		
		this.currentPassword = currentPassword;
		this.newPassword = newPassword;
	}
	public PasswordUpdateRequest() {
		super();
	}
    
}
