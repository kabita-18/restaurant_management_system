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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.stripe.exception.StripeException;
import java.io.OutputStream;

import example.com.JWT.JWTUtilityTokenProvider;
import example.com.exception.ResourceNotFoundException;
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
import example.com.service.ManagementServiceException;
import example.com.service.SseEmitterService;
import io.jsonwebtoken.io.IOException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/deliciousbyte")
//@CrossOrigin(origins = "http://localhost:5173")
public class AppController {
	@Autowired
	private ManagementService service;
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private SseEmitterService emitterService;

//	@GetMapping("/welcome")
//	public String welcome() {
//		return "Welcome to Web Application";
//	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody RegisterUser r)throws ManagementServiceException, ResourceNotFoundException {
		try {
			r.setUsername(r.getUsername().trim());
			r.setEmail(r.getEmail().trim());
			r.setRole(r.getRole().trim());

			RegisterUser existingUser = service.findByEmail(r.getEmail());
			if (existingUser != null) {
				return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email already exists."));
			} else if (service.addUsers(r)) {
				return ResponseEntity.ok(Map.of("success", true, "message", "User registered successfully."));
			} else {
				return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User details invalid."));
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError()
					.body(Map.of("success", false, "message", "Something went wrong."));
		}

	}

	// Mannual user login method
	@PostMapping("/loginuser")
	public int userLogin(@RequestBody Login login) {
		System.out.println(login);
		return service.userLogin(login);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@RequestBody Login login) throws ManagementServiceException, ResourceNotFoundException{
		try {
			Map<String, String> response = service.loginUser(login);
			return ResponseEntity.ok(response);
		} catch (BadCredentialsException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Map.of("success", false, "message", e.getMessage()));
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("success", false, "message", "Something went wrong"));
		}
	}

	@PostMapping("/owner/menu/add")

	public ResponseEntity<String> addMenuItems(@RequestBody Menu m)throws ManagementServiceException, ResourceNotFoundException {
		if (service.addMenuItems(m)) {
			return ResponseEntity.ok("Menu added successfully.");
		} else {
			return ResponseEntity.badRequest().body("Warning: Menu already exists.");
		}
	}

	@PutMapping("/owner/menu/update")
	public String updateMenu(@RequestBody Menu m)throws ManagementServiceException, ResourceNotFoundException {
		if (service.updateMenu(m)) {
			return "Update Successfully..";
		}
		throw new ResourceNotFoundException ("invalid..");
	}

	@PostMapping("/owner/manager/addmanager")
	public String addManager(@RequestBody Manager mgr)throws ManagementServiceException, ResourceNotFoundException {
		if (service.addManager(mgr)) {
			return "Manager Added Successfully..";
		}
		throw new ResourceNotFoundException ("invalid manager details");
	}

	@PutMapping("/owner/manager/updatemanager")
	public String updateManager(@RequestBody Manager mgr) throws ManagementServiceException, ResourceNotFoundException{
		if (service.updateManager(mgr)) {
			return "Manager Updated...!";
		}
		throw new ResourceNotFoundException ( "manager update failed..");
	}

	@PutMapping("update/menu/manager")
	public String updateMenuByManager(@RequestBody Menu m)throws ManagementServiceException, ResourceNotFoundException {
		if (service.updateMenuByManager(m)) {
			return "menu updated..!";

		}
		throw new ResourceNotFoundException ("update failed..");
	}

	@PostMapping("/order/addorder")
	public ResponseEntity<Orders> addOrderByManager(@RequestBody Orders odr)throws ManagementServiceException, ResourceNotFoundException {
		Orders savedOrder = service.addOrderAndReturn(odr);
		System.out.print("Order: " + savedOrder + odr);
		if (savedOrder != null) {
			return ResponseEntity.ok(savedOrder);
		}
		return ResponseEntity.badRequest().build();
	}
	
	 @PutMapping("/confirm/{id}")
	    public ResponseEntity<Object> confirmOrder(@PathVariable Long id) {
	        return ResponseEntity.ok(service.confirmOrder(id));
	    }

	 @PutMapping("/cancel/{id}")
	    public ResponseEntity<Orders> cancelOrder(@PathVariable Long id) {
	        return ResponseEntity.ok(service.cancelOrder(id));
	    }
	 
	@GetMapping("/view/orders")
	public List<Orders> listOfOrders()throws ManagementServiceException, ResourceNotFoundException {
		List<Orders> o = service.findAllOrders();
		if (o != null) {
			return o;

		}
		return null;
	}

	@GetMapping("/view/menu")
	public List<Menu> listOfMenus() throws ManagementServiceException, ResourceNotFoundException{
		List<Menu> m = service.findAllMenus();
		if (m != null) {
			return m;
		}
		return null;
	}

	@GetMapping("/view/manager")
	public List<Manager> listOfManager()throws ManagementServiceException, ResourceNotFoundException {
		List<Manager> m = service.findAllManager();
		if (m != null) {
			return m;
		}
		return null;
	}

	@PutMapping("/updatepassword")
	public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateRequest request)throws ManagementServiceException, ResourceNotFoundException {
		try {
			boolean success = service.updatePassword(request);
			if (success) {
				return ResponseEntity.ok("Password updated successfully.");
			} else {
				return ResponseEntity.status(400).body("Invalid current password.");
			}
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
		}

	}

	@PostMapping("/createpayment")
	public ResponseEntity<PaymentResponse> createPayment(@RequestBody PaymentRequest request) throws ManagementServiceException, ResourceNotFoundException, StripeException {
		System.out.println("Order ID received in request: " + request.getOrderId());
		return ResponseEntity.ok(service.createPaymentIntent(request));
	}

	@GetMapping("/invoice/{paymentId}")
	public void generateInvoice(@PathVariable Long paymentId, HttpServletResponse response)
			throws ManagementServiceException, ResourceNotFoundException,IOException, Exception {
		System.out.println("Generating invoice for Payment ID: " + paymentId);

		service.generateInvoice(paymentId, response);
	}
//	@CrossOrigin(origins = "http://localhost:5173")
	@GetMapping(value = "/track/{orderId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter trackOrder(@PathVariable Long orderId, @RequestParam String token) {
        return emitterService.createEmitter(orderId);
    }
	
	

}
