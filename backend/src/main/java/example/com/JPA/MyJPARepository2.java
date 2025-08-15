package example.com.JPA;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import example.com.model.Manager;
@Repository

public interface MyJPARepository2 extends CrudRepository<Manager,Integer>{
	
	List<Manager> findAllByEmail(String useremail);

	
	@Modifying
	@Query("update Manager m set m.status=:status where m.mid=:mid")
	int updateManager(@Param("mid") int mid, @Param("status") String status);


	@Modifying
	@Query("select m.mname from Manager m where m.email=:useremail and m.password=:password and m.status='available'")
	List<String> findLoginByEmailandPass(@Param("useremail") String useremail, @Param("password") String password);
	
	
//	@Modifying()
//	@Query("update Manager m set m.password=:password where LOWER(m.email)=LOWER(:useremail)")
//	int updatePassword(@Param("useremail") String useremail,@Param("password") String password);

	

}
