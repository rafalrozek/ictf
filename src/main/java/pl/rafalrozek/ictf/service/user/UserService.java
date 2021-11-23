package pl.rafalrozek.ictf.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.rafalrozek.ictf.dto.user.UserResponse;
import pl.rafalrozek.ictf.model.*;
import pl.rafalrozek.ictf.repository.*;
import pl.rafalrozek.ictf.websocket.WebSocketHandler;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final EventRepository eventRepository;
    private final ScoreboardRepository scoreboardRepository;
    private final NotificationRepository notificationRepository;
    private final PasswordEncoder passwordEncoder;
    private final WebSocketHandler webSocketHandler;


    public User getUserByName(String name) throws UsernameNotFoundException {
        final Optional<User> userOptional = userRepository.findByName(name);

        userOptional.orElseThrow(() -> {
            throw new UsernameNotFoundException("Not found2 " + name);
        });

        return userOptional.get();
    }


    public User createUser(String name, String password) {
        User user = User.builder()
                .name(name)
                .email(name+"@"+name+".pl")
                .password(passwordEncoder.encode(password))
                .build();
        userRepository.save(user);
        return user;
    }
    public User getContextUser() throws UsernameNotFoundException {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final org.springframework.security.core.userdetails.User springUser = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();
        final Optional<User> userOptional = userRepository.findByName(springUser.getUsername());

        userOptional.orElseThrow(() -> {
            throw new UsernameNotFoundException("Not found " + springUser.getUsername());
        });

        return userOptional.get();
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAllByOrderByIdAsc();
    }

    public Integer validateFlag(Long id, String flag) {
        User user = getContextUser();
        //check is already done
        if(user.getDoneTasks().contains(id.intValue())){
            return 1;
        }
        Task task = taskRepository.getById(id);
        if(task == null){
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "d");
            return 2;
        }
        if(task.getFlag().equals(flag)){
            //correct flag
            user.getDoneTasks().add(id.intValue());
            Integer newpoints = user.getPoints() + task.getPoints();
            user.setPoints(newpoints);
            userRepository.save(user);
            //add to scoreboard
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            Scoreboard scoreboard = Scoreboard.builder()
                    .username(user.getName())
                    .timestamp(timestamp.getTime())
                    .value(newpoints)
                    .build();

            scoreboardRepository.save(scoreboard);
            Notification notification = Notification.builder()
                    .message("Rozwiązałeś zadanie " + task.getTitle() + "!")
                    .timestamp(timestamp.getTime())
                    .username(user.getName())
                    .build();
            notificationRepository.save(notification);
            webSocketHandler.sendToAll("new");
            webSocketHandler.sendToAll("notify");

            return 0;
        }


        return 3;

    }

    public List<Scoreboard> getAllScoreboard() {
        return scoreboardRepository.findAll();
    }

    public List<UserResponse> getUsers() {
        List<User> users = userRepository.findAll();
        List<UserResponse> usersResponse = new java.util.ArrayList<>(Collections.emptyList());
        for (var u : users) {
            UserResponse usr = UserResponse.builder()
                    .points(u.getPoints())
                    .tasks(u.getDoneTasks().size())
                    .name(u.getName())
                    .email(u.getEmail())
                    .build();

            usersResponse.add(usr);
        }

        return usersResponse;
    }

    public List<Notification> getAllNotifications() {
        User user = getContextUser();
        return notificationRepository.findAllByUsername(user.getName());

    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
        webSocketHandler.sendToAll("notify");
    }
}
