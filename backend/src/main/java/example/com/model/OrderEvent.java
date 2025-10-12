package example.com.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Builder;

@Entity


@Table(name = "order_events")

public class OrderEvent {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long aggregateId; // same as orderid from Orders

//    @Enumerated(EnumType.STRING)   // ✅ Store enum as String in DB
    private String eventType;  // e.g. "ORDER_CREATED", "ITEM_ADDED", "ORDER_CANCELLED"

    @Lob
    @Column(columnDefinition = "TEXT")
    private String payload; // JSON representation of the event

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp = new Date();

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getAggregateId() {
		return aggregateId;
	}

	public void setAggregateId(Long aggregateId) {
		this.aggregateId = aggregateId;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType2) {
		this.eventType = eventType2;
	}

	public String getPayload() {
		return payload;
	}

	public void setPayload(String payload) {
		this.payload = payload;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public OrderEvent(Long id, Long aggregateId, String eventType, String payload, Date timestamp) {
		super();
		this.id = id;
		this.aggregateId = aggregateId;
		this.eventType = eventType;
		this.payload = payload;
		this.timestamp = timestamp;
	}

	public OrderEvent() {
		super();
	}

	@Override
	public String toString() {
		return "OrderEvent [id=" + id + ", aggregateId=" + aggregateId + ", eventType=" + eventType + ", payload="
				+ payload + ", timestamp=" + timestamp + "]";
	}

	

}
