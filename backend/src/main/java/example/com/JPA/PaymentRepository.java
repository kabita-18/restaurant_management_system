package example.com.JPA;

import org.springframework.data.repository.CrudRepository;

import example.com.model.PaymentEntity;

public interface PaymentRepository extends CrudRepository<PaymentEntity, Long> {

}
