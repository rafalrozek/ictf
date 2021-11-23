package pl.rafalrozek.ictf.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.rafalrozek.ictf.dto.user.ValidateFlagRequest;
import pl.rafalrozek.ictf.model.Event;
import pl.rafalrozek.ictf.model.Scoreboard;
import pl.rafalrozek.ictf.model.Task;
import pl.rafalrozek.ictf.model.User;
import pl.rafalrozek.ictf.service.user.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserRequestController {
    private final UserService userService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(){
        User user = userService.getContextUser();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/tasks")
    public ResponseEntity<?> tasks(){
        List<Task> taskList = userService.getAllTasks();
        return ResponseEntity.ok(taskList);
    }

    @GetMapping("/events")
    public ResponseEntity<?> events(){
        List<Event> eventsList = userService.getAllEvents();
        return ResponseEntity.ok(eventsList);
    }

    @PostMapping("/validateflag")
    public ResponseEntity<?> validateflag(@RequestBody ValidateFlagRequest validateFlag){
        Integer resp = userService.validateFlag(validateFlag.getId(), validateFlag.getFlag());
        return ResponseEntity.ok(resp);
    }
    @GetMapping("/scoreboard")
    public ResponseEntity<?> scoreboard(){
        List<Scoreboard> scoreboardList = userService.getAllScoreboard();
        return ResponseEntity.ok(scoreboardList);
    }
    @GetMapping("/users")
    public ResponseEntity<?> users(){
        var usersList = userService.getUsers();
        return ResponseEntity.ok(usersList);
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> notifications(){
        var notifications = userService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    @DeleteMapping("/notification/{id}")
    public ResponseEntity<?> deletenotification(@PathVariable Long id){
        userService.deleteNotification(id);

        return ResponseEntity.ok("OK");
    }

}
