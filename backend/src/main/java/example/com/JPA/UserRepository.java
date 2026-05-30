package example.com.JPA;

import java.util.List;
import java.util.Optional;

import jakarta.validation.constraints.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import example.com.model.RegisterUser;

@Repository
public interface UserRepository extends JpaRepository<RegisterUser,Long> {

//	RegisterUser findByEmail(String email);
	
	@Modifying()
	@Query("update RegisterUser r set r.password=:password where r.email=:email")
	int updatePassword(@Param("email") String useremail,@Param("password") String password);

	List<RegisterUser> findByRole(String string);

    Optional<RegisterUser> findOptionalByEmail(String email);

    RegisterUser findByEmail(String email);
}

