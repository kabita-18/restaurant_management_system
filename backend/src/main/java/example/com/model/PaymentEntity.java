package example.com.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long orderId;
    private double amount;
    private String paymentStatus;
    private String stripePaymentId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getOrderId() {
		return orderId;
	}
	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double d) {
		this.amount = d;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public String getStripePaymentId() {
		return stripePaymentId;
	}
	public void setStripePaymentId(String stripePaymentId) {
		this.stripePaymentId = stripePaymentId;
	}
	@Override
	public String toString() {
		return "PaymentEntity [id=" + id + ", orderId=" + orderId + ", amount=" + amount + ", paymentStatus="
				+ paymentStatus + ", stripePaymentId=" + stripePaymentId + "]";
	}
	public PaymentEntity(Long id, Long orderId, int amount, String paymentStatus, String stripePaymentId) {
		super();
		this.id = id;
		this.orderId = orderId;
		this.amount = amount;
		this.paymentStatus = paymentStatus;
		this.stripePaymentId = stripePaymentId;
	}
	public PaymentEntity() {
		super();
	}
    
}
