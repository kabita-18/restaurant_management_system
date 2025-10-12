package example.com.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
public class SseEmitterService {

    // Map orderId -> list of subscribers
    private final Map<Long, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    // Store last known status for replay
    private final Map<Long, String> lastStatus = new ConcurrentHashMap<>();

    // create a new emitter when a client subscribes
    public SseEmitter createEmitter(Long orderId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.computeIfAbsent(orderId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        emitter.onCompletion(() -> removeEmitter(orderId, emitter));
        emitter.onTimeout(() -> removeEmitter(orderId, emitter));
        emitter.onError(e -> removeEmitter(orderId, emitter));

        // 🔥 Send last known status immediately if exists
        if (lastStatus.containsKey(orderId)) {
            try {
                emitter.send(
                    SseEmitter.event()
                        .name("order-status")
                        .data(Map.of("status", lastStatus.get(orderId))), // ✅ real JSON
                    MediaType.APPLICATION_JSON
                );
                System.out.println("📡 Sent initial status=" + lastStatus.get(orderId) + " for orderId=" + orderId);
            } catch (IOException e) {
                removeEmitter(orderId, emitter);
            }
        }

        return emitter;
    }

    // send updates to all subscribers for an order
    public void sendStatus(Long orderId, String status) {
        lastStatus.put(orderId, status);

        List<SseEmitter> orderEmitters = emitters.get(orderId);
        if (orderEmitters != null) {
            for (SseEmitter emitter : orderEmitters) {
                try {
                    emitter.send(
                        SseEmitter.event()
                            .name("order-status")
                            .data(Map.of("status", status)), // ✅ real JSON
                        MediaType.APPLICATION_JSON
                    );
                } catch (IOException e) {
                    removeEmitter(orderId, emitter);
                }
            }
        }
    }

    private void removeEmitter(Long orderId, SseEmitter emitter) {
        List<SseEmitter> list = emitters.get(orderId);
        if (list != null) {
            list.remove(emitter);
        }
    }
}
