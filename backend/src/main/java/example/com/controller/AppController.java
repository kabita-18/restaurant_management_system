package example.com.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import java.io.OutputStream;

import example.com.JWT.JWTUtilityTokenProvider;
import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.Orders;
import example.com.model.PasswordUpdateRequest;
import example.com.model.PaymentEntity;
import example.com.model.PaymentRequest;
import example.com.model.PaymentResponse;
import example.com.model.RegisterUser;
import example.com.service.ManagementService;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/deliciousbyte")
//@CrossOrigin(origins = "http://localhost:5173")
public class AppController {
	@Autowired
	private ManagementService service;
	@Autowired
	private AuthenticationManager authenticationManager;

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome to Web Application";
	}

	@PostMapping("/register")
	public String registerUser(@RequestBody RegisterUser r) {
		try {
			if (service.findByEmail(r.getEmail()) != null) {
				return "Email already exists.";
			} else if (service.addUsers(r)) {
				return "User details added successfully...";
			}
		} catch (DataIntegrityViolationException e) {
			return "User details invalid.";
		}
		return "Something went wrong";

	}

	// Mannual user login method
	@PostMapping("/loginuser")
	public int userLogin(@RequestBody Login login) {
		System.out.println(login);
		return service.userLogin(login);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody Login login) {
		try {
			Map<String, String> response = service.loginUser(login);
			return ResponseEntity.ok(response);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
		}
	}

	@PostMapping("/owner/menu/add")

	public ResponseEntity<String> addMenuItems(@RequestBody Menu m) {
	    if (service.addMenuItems(m)) {
	        return ResponseEntity.ok("Menu added successfully.");
	    } else {
	        return ResponseEntity.badRequest()
	                             .body("Warning: Menu already exists.");
	    }
	}

	@PutMapping("/owner/menu/update")
	public String updateMenu(@RequestBody Menu m) {
		if (service.updateMenu(m)) {
			return "Update Successfully..";
		}
		return "invalid..";
	}

	@PostMapping("/owner/manager/addmanager")
	public String addManager(@RequestBody Manager mgr) {
		if (service.addManager(mgr)) {
			return "Manager Added Successfully..";
		}
		return "invalid manager details";
	}

	@PutMapping("/owner/manager/updatemanager")
	public String updateManager(@RequestBody Manager mgr) {
		if (service.updateManager(mgr)) {
			return "Manager Updated...!";
		}
		return "manager update failed..";
	}

	@PutMapping("/manager/menu/update")
	public String updateMenuByManager(@RequestBody Menu m) {
		if (service.updateMenuByManager(m)) {
			return "menu updated..!";

		}
		return "update failed..";
	}
	
	
	@PostMapping("/order/addorder")
	public ResponseEntity<Orders> addOrderByManager(@RequestBody Orders odr) {
	    Orders savedOrder = service.addOrderAndReturn(odr);
	    System.out.print("Order: " + savedOrder + odr);
	    if (savedOrder != null) {
	        return ResponseEntity.ok(savedOrder); 
	    }
	    return ResponseEntity.badRequest().build();
	}


	@GetMapping("/view/order")
	public List<Orders> listOfOrders() {
		List<Orders> o = service.findAllOrders();
		if (o != null) {
			return o;

		}
		return null;
	}

	@GetMapping("/view/menu")
	public List<Menu> listOfMenus() {
		List<Menu> m = service.findAllMenus();
		if (m != null) {
			return m;
		}
		return null;
	}

	@GetMapping("/view/manager")
	public List<Manager> listOfManager() {
		List<Manager> m = service.findAllManager();
		if (m != null) {
			return m;
		}
		return null;
	}

//	@PutMapping("/manager/updatepassword")
//	public String updatePassword(@RequestBody Login log) {
//		System.out.println(log.getUseremail());
//		System.out.println(log.getPassword());
//
//		if (service.updatePassword(log)) {
//			return "Update Successful...";
//		}
//		return "Error..";
//	}

	@PutMapping("/manager/updatepassword")
	public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request) {
		try {
			boolean success = service.updatePassword(request);
			if (success) {
				return ResponseEntity.ok("Password updated successfully.");
			} else {
				return ResponseEntity.status(400).body("Invalid current password.");
			}
		}
		catch (RuntimeException ex) {
		       return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
		  }
		
		
	}
	
	@PostMapping("/createpayment")
    public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest request) throws StripeException {
		System.out.println("Order ID received in request: " + request.getOrderId());
        return ResponseEntity.ok(service.createPaymentIntent(request));
    }
	
	 @GetMapping("/invoice/{paymentId}")
	 public void generateInvoice(@PathVariable Long paymentId, HttpServletResponse response) throws IOException, Exception {
		 System.out.println("Generating invoice for Payment ID: " + paymentId);

		    service.generateInvoice(paymentId, response);
	    }

}
