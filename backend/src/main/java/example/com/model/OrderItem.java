package example.com.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity

public class OrderItem {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long orderItemId;

	    private String dishname;

	    private int quantity;

	    private double price;
	    
	    @ManyToOne
	    @JoinColumn(name = "orderid", referencedColumnName = "orderid") 
	    @JsonBackReference
	    private Orders orders;
	    

	    public Orders getOrders() {
			return orders;
		}

		public void setOrders(Orders orders) {
			this.orders = orders;
		}

		public Long getOrderItemId() {
	        return orderItemId;
	    }

	    public void setOrderItemId(Long id) {
	        this.orderItemId = id;
	    }

	    public String getDishname() {
	        return dishname;
	    }

	    public void setDishname(String dishname) {
	        this.dishname = dishname;
	    }

	    public int getQuantity() {
	        return quantity;
	    }

	    public void setQuantity(int quantity) {
	        this.quantity = quantity;
	    }

	    public double getPrice() {
	        return price;
	    }

	    public void setPrice(double price) {
	        this.price = price;
	    }

		@Override
		public String toString() {
			return "OrderItem [OrderItemId=" + orderItemId + ", dishname=" + dishname + ", quantity=" + quantity
					+ ", price=" + price + "]";
		}

		public OrderItem(Long id, String dishname, int quantity, double price) {
			super();
			this.orderItemId = id;
			this.dishname = dishname;
			this.quantity = quantity;
			this.price = price;
		}

		public OrderItem() {
			super();
		}

		
	    

}
