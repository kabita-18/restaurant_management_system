package example.com.service;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderStatusSimulator {
	@Autowired
	private SseEmitterService emitterService;
    private final ScheduledExecutorService executor = Executors.newScheduledThreadPool(1);
    
//    public OrderStatusSimulator(SseEmitterService emitterService) {
//        this.emitterService = emitterService;
//    }
//    
    public void startStatusFlow(Long orderId) {
    	
    	 
        String[] steps = {"CONFIRMED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"};
        
        try {
        	System.out.println("Sending initial status CONFIRMED for orderId=" + orderId);
            emitterService.sendStatus(orderId, steps[0]);
        } catch (Exception e) {
            e.printStackTrace();
        }

        for (int i = 0; i < steps.length; i++) {
            int delay = (i + 1) * 10; // every 10 seconds
            String status = steps[i];
            System.out.println("Sending update for order " + orderId + " status=" + status);

            executor.schedule(() -> {
                try {
					emitterService.sendStatus(orderId, status);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
            }, delay, TimeUnit.SECONDS);
        }
    }

}
