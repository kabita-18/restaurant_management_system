package example.com.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor   // Good to have a default constructor
public class PaymentResponse {
    private String clientSecret;
    private Long paymentId;
}
