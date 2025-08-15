package example.com.DAO;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;
import org.springframework.web.server.ResponseStatusException;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import example.com.JPA.MyJPARepository;
import example.com.JPA.MyJPARepository2;
import example.com.JPA.MyJPArepository3;
import example.com.JPA.PaymentRepository;
import example.com.JPA.UserRepository;
import example.com.JWT.JWTUtilityTokenProvider;
import example.com.model.JwtResponse;
import example.com.model.Login;
import example.com.model.Manager;
import example.com.model.Menu;
import example.com.model.OrderItem;
import example.com.model.Orders;
import example.com.model.PasswordUpdateRequest;
import example.com.model.PaymentEntity;
import example.com.model.PaymentRequest;
import example.com.model.PaymentResponse;
import example.com.model.RegisterUser;
import example.com.service.InvoiceEmailService;
import example.com.service.PdfGenerator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Repository
public class ManagementDAOImpl implements ManagementDAO {
	@Autowired
	public MyJPARepository myRepo;

	@Autowired
	public MyJPARepository2 myRepo2;
	@Autowired
	public MyJPArepository3 myRepo3;
	@Autowired
	public UserRepository userRepo;
	@Autowired
	public PaymentRepository paymentRepo;
	@Autowired
	private JWTUtilityTokenProvider jwtTokenProvider;
	
	 @Autowired
	    private PdfGenerator pdfGenerator;
	 @Autowired
	 private InvoiceEmailService invoiceEmailService;
	
	@Value("${stripe.secret.key}")
    private String secretKey;

	 @Autowired
	 private PaymentRepository paymentRepository;

	 
	@Override
	public boolean addMenuItems(Menu m) {
		
		if(myRepo.existsBydishname(m.getDishname())) {
			return false;
		}
		return myRepo.save(m) != null;
	}

	@Override
	@Transactional
	public boolean updateMenu(Menu m) {
		int t = myRepo.updatePriceOrStatus(m.getDishname(), m.getStatus(), m.getPrice());
		System.out.println(t);
		if (t > 0) {
			return true;
		}
		return false;
	}

	public boolean addManager(Manager mgr) {
		if (myRepo2.save(mgr) != null) {
			return true;
		}
		return false;
	}

	@Transactional
	public boolean updateManager(Manager mgr) {
		int t = myRepo2.updateManager(mgr.getMid(), mgr.getStatus());
		if (t > 0) {
			return true;
		}
		return false;
	}

	@Override
	@Transactional
	public boolean updateMenuByManager(Menu m) {
		int t = myRepo.updateMenuByManager(m.getDishname(), m.getStatus());
		if (t > 0) {
			return true;
		}
		return false;
	}

	@Override
	public Orders addOrderAndReturn(Orders odr){
		try {
			if (odr.getOrderinfo() != null) {
	            List<OrderItem> managedItems = new ArrayList<>();
	            for (OrderItem item : odr.getOrderinfo()) {
	                item.setOrders(odr);           
	                item.setOrderItemId(null);     
	                managedItems.add(item);
	            }
	            odr.setOrderinfo(managedItems);
	        }

	        return myRepo3.save(odr); 
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        return null;
	    }
	}

	@Override
	public List<Orders> findAllOrders() {
		List<Orders> orderlist = (List<Orders>) myRepo3.findAll();
		return orderlist;
	}

	@Override
	public List<Menu> findAllMenus() {

		List<Menu> menuList = (List<Menu>) myRepo.findAll();
		return menuList;
	}

	@Override
	public List<Manager> findAllManager() {
		List<Manager> allManagers = new ArrayList<>();
		 List<RegisterUser> registeredManagers = userRepo.findByRole("MANAGER");
		 
		 for (RegisterUser user : registeredManagers) {
			 Manager dto = new Manager();
		        dto.setMid(user.getId().intValue()); 
		        dto.setMname(user.getUsername());
		        dto.setEmail(user.getEmail());
		        dto.setStatus("Available"); 
		        System.out.println("Manager from ManagerDetails: " + dto); 
		        allManagers.add(dto);
	        }
	        List<Manager> managerDetails = (List<Manager>) myRepo2.findAll();
	        for (Manager m : managerDetails) {
	            Manager dto = new Manager();
	            dto.setMid(m.getMid());
	            dto.setMname(m.getMname());
	            dto.setStatus(m.getStatus());
	            dto.setEmail(m.getEmail());
	            System.out.println("Manager from ManagerDetails: " + dto); 
	            allManagers.add(dto);
	        }

	        return allManagers;
	}

	@Override
	public int userLogin(Login log) {

		RegisterUser user = userRepo.findByEmail(log.getUseremail());
//		System.out.println("Email entered: " + log.getUseremail());
//		System.out.println("Password entered: " + log.getPassword());

		if (user != null && user.getEmail().equals(log.getUseremail())
				&& log.getPassword().equals(user.getPassword())) {
//			System.out.println("Input password: " + log.getPassword());
//		    System.out.println("DB password: " + user.getPassword());
			return 1;
		} else {
			System.out.println("Password mismatch.");
		}

		return 0;
	}

//	@Transactional
//	public boolean updatePassword(Login log) {
//		String email = log.getUseremail();
//	    String password = log.getPassword();
//
//	    RegisterUser user = userRepo.findByEmail(email);
//	    System.out.println("Inside updatePassword()");
//
//	    if (user != null && user.getPassword().equals(password) && user.getEmail().equals(email)) {
//	      
//	        int rowsUpdated = userRepo.updatePassword(email, password); 
//	        System.out.println("Rows updated: " + rowsUpdated);
//	        return rowsUpdated > 0;
//	    }
//	    return false;
//	}

	@Override
	public boolean addUsers(RegisterUser r) {
		if (userRepo.save(r) != null)
			return true;
		return false;

	}

	@Override
	public RegisterUser findByEmail(String email) {
		// TODO Auto-generated method stub
		return userRepo.findByEmail(email);
	}

	@Override
	public JwtResponse generateJwtToken(String useremail) {
		// TODO Auto-generated method stub
		RegisterUser user = userRepo.findByEmail(useremail);
		if (user == null) {
			throw new UsernameNotFoundException("User not found");
		}
		String jwtToken = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());
		return new JwtResponse(jwtToken);

	}

	@Override
	public Map<String, String> loginUser(Login login) throws BadCredentialsException {
		// TODO Auto-generated method stub
		RegisterUser user = userRepo.findByEmail(login.getUseremail());
		if (user == null) {
			throw new BadCredentialsException("User not found");
		}

		if (!user.getPassword().equals(login.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}

		String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole());

		Map<String, String> response = new HashMap<>();
		response.put("token", token);
		response.put("email", user.getEmail());
		response.put("role", user.getRole());
		return response;
	}

	@Override
	@Transactional
	public boolean updatePassword(PasswordUpdateRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = (String) authentication.getPrincipal(); // Email from JWT set in SecurityContext

		String currentPassword = request.getCurrentPassword();
		String newPassword = request.getNewPassword();

		RegisterUser user = userRepo.findByEmail(email);
//		System.out.println("Inside updatePassword() with email: " + email);
		
		if (user == null) {
	        throw new RuntimeException("User not found.");
	    }

	    if (!user.getPassword().equals(currentPassword)) {
	        throw new RuntimeException("Incorrect current password.");
	    }

	    int rowsUpdated = userRepo.updatePassword(email, newPassword);
	    System.out.println("Rows updated: " + rowsUpdated);
	    return rowsUpdated > 0;
	}


	@Override
	public PaymentResponse createPaymentIntent(PaymentRequest request) throws StripeException {
	    Stripe.apiKey = secretKey;

	    Long orderId = request.getOrderId(); 

	    if (orderId == null) {
	        throw new IllegalArgumentException("Order ID must not be null");
	    }

	    Optional<Orders> optionalOrder = myRepo3.findByorderid(orderId);

	    if (optionalOrder.isEmpty()) {
	        throw new IllegalArgumentException("Order not found for ID: " + orderId);
	    }

	    Orders order = optionalOrder.get();
	    double orderAmount = order.getTprice();

	    System.out.println("Received order ID: " + orderId + ", Order Amount: " + orderAmount);

	    if (request.getAmount() == 0 || Double.compare(orderAmount, request.getAmount()) != 0) {
	        throw new IllegalArgumentException("Amount mismatch or missing: invalid payment request.");
	    }
	    
	    PaymentEntity payment = new PaymentEntity();
	    payment.setOrderId(orderId);
	    payment.setAmount(orderAmount);
	    payment.setPaymentStatus("created");
	    payment = paymentRepository.save(payment);
	    
	    PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
	            .setAmount((long) (orderAmount * 100)) 
	            .setCurrency(request.getCurrency())
	            .setDescription(request.getDescription())
	            .putMetadata("paymentId", String.valueOf(payment.getId())) 
	            .build();

	    PaymentIntent intent = PaymentIntent.create(params);
//	    payment.setOrderId(orderId);
//	    payment.setAmount(orderAmount);
//	    payment.setPaymentStatus("created");
	    payment.setStripePaymentId(intent.getId());

	    paymentRepository.save(payment);
	    order.setOrderStatus("Completed");
	    myRepo3.save(order);

	    return new PaymentResponse(intent.getClientSecret(), payment.getId());
	}


	@Override
	public void generateInvoice(Long paymentId, HttpServletResponse response) throws IOException {
        PaymentEntity payment = paymentRepo.findById(paymentId)
        		 .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found"));

        Orders order = myRepo3.findById(payment.getOrderId())
        		 .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=invoice_" + payment.getId() + ".pdf");
        
        System.out.println("Received order: " + order);
        System.out.println("Received payment: " + payment);
        
        try {
            pdfGenerator.generateInvoice(payment, order, response.getOutputStream());
            response.getOutputStream().flush();
        } catch (Exception e) {
            throw new IOException("Error generating invoice PDF", e);
        }

        // Optionally send invoice email after generating the PDF
        try {
            invoiceEmailService.sendInvoiceEmail(payment, order);
        } catch (Exception e) {
            e.printStackTrace();
            // Optional: log failure but don't block invoice generation
        }
    }

}
