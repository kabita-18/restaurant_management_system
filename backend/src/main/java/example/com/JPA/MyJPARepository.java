package example.com.JPA;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import example.com.model.Menu;


@Repository
public interface MyJPARepository extends CrudRepository<Menu,String> {

	@Modifying
	@Query("update Menu m set m.price=:price,m.status=:status where m.dishname=:dishname")
	int updatePriceOrStatus(@Param("dishname") String dishname, @Param("status") String status,@Param("price") double price);
	
	@Modifying
	@Query("update Menu m set m.status=:status where m.dishname=:dishname")
	int updateMenuByManager(@Param("dishname") String dishname, @Param("status") String status);

	

	boolean existsBydishname(String dishname);

	
	
	

	

}
