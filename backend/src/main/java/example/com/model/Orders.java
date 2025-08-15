package example.com.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.Size;

import jakarta.persistence.*;


import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@SequenceGenerator(name = "order_gen", sequenceName = "order_gen", initialValue = 1000)
public class Orders {
	
	@Column(name = "orderid")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "order_gen")
    private Long orderid;

    private String customerName;

    @Size(min = 10, max = 10)
    private String mobileno;

    private String email;

    private Integer tableno;

    private String orderType; 

    @OneToMany(mappedBy = "orders", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<OrderItem> orderinfo = new ArrayList<>();

    private double tprice;

    private String orderStatus;

    private String paymentMode;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createdAt = new Date();

    public Orders() {
		super();
	}

	public Orders(Long orderid, String customerName, String mobileno, String email, Integer tableno, String orderType,
			List<OrderItem> orderinfo, double tprice, String orderStatus, String paymentMode, Date createdAt) {
		super();
		this.orderid = orderid;
		this.customerName = customerName;
		this.mobileno = mobileno;
		this.email = email;
		this.tableno = tableno;
		this.orderType = orderType;
		this.orderinfo = orderinfo;
		this.tprice = tprice;
		this.orderStatus = orderStatus;
		this.paymentMode = paymentMode;
		this.createdAt = createdAt;
	}

	@Override
	public String toString() {
		return "Orders [orderid=" + orderid + ", customerName=" + customerName + ", mobileno=" + mobileno + ", email="
				+ email + ", tableno=" + tableno + ", orderType=" + orderType + ", orderinfo=" + orderinfo + ", tprice="
				+ tprice + ", orderStatus=" + orderStatus + ", paymentMode=" + paymentMode + ", createdAt="
				+ createdAt + "]";
	}

	// Automatically calculate total price before saving or updating
    @PrePersist
    @PreUpdate
    public void calculateTotalPrice() {
        if (orderinfo != null && !orderinfo.isEmpty()) {
            this.tprice = orderinfo.stream()
                    .mapToDouble(item -> item.getPrice() * item.getQuantity())
                    .sum();
        } else {
            this.tprice = 0.0;
        }
    }

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getMobileno() {
        return mobileno;
    }

    public void setMobileno(String mobileno) {
        this.mobileno = mobileno;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getTableno() {
        return tableno;
    }

    public void setTableno(Integer tableno) {
        this.tableno = tableno;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public List<OrderItem> getOrderinfo() {
        return orderinfo;
    }

    public void setOrderinfo(List<OrderItem> orderinfo) {
        this.orderinfo = orderinfo;
    }

    public double getTprice() {
        return tprice;
    }

    public void setTprice(double tprice) {
        this.tprice = tprice;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
    
}
