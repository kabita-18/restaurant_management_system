package example.com.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentResponse {
	private String clientSecret;  
    private Long paymentId;       

    public PaymentResponse(String clientSecret, Long paymentId) {
        this.clientSecret = clientSecret;
        this.paymentId = paymentId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public Long getPaymentId() {
        return paymentId;
    }
	
    
}
