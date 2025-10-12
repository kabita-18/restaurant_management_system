package example.com.service;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

import example.com.JPA.OrderEventRepository;
import example.com.model.OrderEvent;
import example.com.model.OrderStatus;
@Service

public class EventSourcingService {
	private final OrderEventRepository eventRepository;
    private final ObjectMapper objectMapper;

    public EventSourcingService(OrderEventRepository eventRepository, ObjectMapper objectMapper) {
        this.eventRepository = eventRepository;
        this.objectMapper = objectMapper;
    }
    
    public void recordEvent(Long aggregateId, String eventType, Object payload) {
        try {
            String jsonPayload = objectMapper.writeValueAsString(payload);

            OrderEvent event = new OrderEvent();
            event.setAggregateId(aggregateId);
            event.setEventType(eventType);
            event.setPayload(jsonPayload);

            eventRepository.save(event);
        } catch (Exception e) {
            throw new RuntimeException("Error saving event", e);
        }
    }
}
