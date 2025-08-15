package example.com.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Id;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data

public class PaymentRequest {
	
//	@JsonProperty("orderid")
	private Long orderId;
	private double amount;
    private String currency;
    private String description;
   
    
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount2) {
		this.amount = amount2;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public PaymentRequest(double amount, String currency, String description, Long orderId) {
		super();
		this.amount = amount;
		this.currency = currency;
		this.description = description;
		this.orderId = orderId;
	}
	@Override
	public String toString() {
		return "PaymentRequest [amount=" + amount + ", currency=" + currency + ", description=" + description
				+ ", orderId=" + orderId + "]";
	}
	public PaymentRequest() {
		super();
	}
	
    

}
