package example.com.JPA;

import org.springframework.data.jpa.repository.JpaRepository;

import example.com.model.OrderEvent;

public interface OrderEventRepository extends JpaRepository<OrderEvent, Long>{

}
