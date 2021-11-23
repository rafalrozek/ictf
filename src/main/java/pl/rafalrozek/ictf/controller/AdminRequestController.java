package pl.rafalrozek.ictf.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rafalrozek.ictf.dto.admin.AddEventRequest;
import pl.rafalrozek.ictf.dto.admin.AddTaskRequest;
import pl.rafalrozek.ictf.dto.admin.SendNotificationRequest;
import pl.rafalrozek.ictf.model.Event;
import pl.rafalrozek.ictf.model.Notification;
import pl.rafalrozek.ictf.model.Task;
import pl.rafalrozek.ictf.model.User;
import pl.rafalrozek.ictf.repository.EventRepository;
import pl.rafalrozek.ictf.repository.NotificationRepository;
import pl.rafalrozek.ictf.repository.TaskRepository;
import pl.rafalrozek.ictf.service.user.UserService;
import pl.rafalrozek.ictf.websocket.WebSocketHandler;

import javax.transaction.Transactional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminRequestController {
    private final UserService userService;
    private final EventRepository eventRepository;
    private final TaskRepository taskRepository;
    private final NotificationRepository notificationRepository;
    private final WebSocketHandler webSocketHandler;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(){
        User user = userService.getContextUser();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/addEvent")
    public ResponseEntity<?> addEvent(@RequestBody AddEventRequest addEventRequest){
        Event event = Event.builder()
                .date(addEventRequest.getDate())
                .description(addEventRequest.getDescription())
                .build();

        eventRepository.save(event);
        return ResponseEntity.ok("OK");
    }

    @PostMapping("/addTask")
    public ResponseEntity<?> addEvent(@RequestBody AddTaskRequest addTaskRequest){
        Task t = Task.builder()
                .category(addTaskRequest.getCategory())
                .flag(addTaskRequest.getFlag())
                .points(addTaskRequest.getPoints())
                .title(addTaskRequest.getTitle())
                .description(addTaskRequest.getDescription())
                .build();


        taskRepository.save(t);
        return ResponseEntity.ok("OK");
    }

    @Transactional
    @PostMapping(value = "/deleteTask/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id){
        taskRepository.deleteById(id);
        return ResponseEntity.ok("OK");
    }

    @PostMapping(value = "/sendNotification", produces = "application/json")
    public ResponseEntity<?> sendNotification(@RequestBody SendNotificationRequest sendNotificationRequest){
        for (var u : sendNotificationRequest.getUsers()) {
            Notification n = Notification.builder()
                    .username(u)
                    .message(sendNotificationRequest.getMessage())
                    .build();

            notificationRepository.save(n);
        }
        synchronized (webSocketHandler){
            webSocketHandler.sendToAll("notify");
        }


        return ResponseEntity.ok(true);
    }

}
