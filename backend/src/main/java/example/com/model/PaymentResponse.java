package example.com.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
//@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponse {
    private String clientSecret;
    private Long paymentId;

    public PaymentResponse(String clientSecret, Long paymentId) {
        this.clientSecret = clientSecret;
        this.paymentId = paymentId;
    }
}
