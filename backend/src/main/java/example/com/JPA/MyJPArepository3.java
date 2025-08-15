package example.com.JPA;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import example.com.model.Orders;

@Repository

public interface MyJPArepository3 extends JpaRepository<Orders,Long>{

	Optional<Orders> findByorderid(Long orderid);

	
	
}
