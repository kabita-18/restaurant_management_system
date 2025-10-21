package example.com.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;

@Entity
//@SequenceGenerator(name = "port_gen_2", sequenceName = "port_gen_2",  initialValue = 2000)

public class Menu {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int menuid;
	
	@Column(unique = true, nullable = false)
	private String dishname;
	
	@Column(nullable = false)
	private String category;
	
	private double price;
	
	private String status;

	public int getMenuid() {
		return menuid;
	}

	public void setMenuid(int menuid) {
		this.menuid = menuid;
	}

	public String getDishname() {
		return dishname;
	}

	public void setDishname(String dishname) {
		this.dishname = dishname;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "Menu [menuid=" + menuid + ", dishname=" + dishname + ", category=" + category + ", price=" + price
				+ ", status=" + status + "]";
	}

	public Menu() {
		super();
	}

	public Menu(int menuid,String dishname, String category, double price, String status) {
		super();
		this.menuid=menuid;
		this.dishname = dishname;
		this.category = category;
		this.price = price;
		this.status = status;
	}
	
	
}
