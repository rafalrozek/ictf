package pl.rafalrozek.ictf;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.rafalrozek.ictf.model.*;
import pl.rafalrozek.ictf.repository.EventRepository;
import pl.rafalrozek.ictf.repository.ScoreboardRepository;
import pl.rafalrozek.ictf.repository.TaskRepository;
import pl.rafalrozek.ictf.repository.UserRepository;
import pl.rafalrozek.ictf.service.user.UserService;

import java.sql.Timestamp;
import java.util.Collections;


@Log4j2
@Component
@RequiredArgsConstructor
public class ServerInitializer implements ApplicationRunner {
    private final UserRepository userRepository;
    private final UserService userService;
    private final TaskRepository taskRepository;
    private final EventRepository eventRepository;
    private final ScoreboardRepository scoreboardRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        var user = User.builder()
                .password(passwordEncoder.encode("a"))
                .name("a")
                .email("a@a.pl")
                .roles(Collections.singletonList(Role.ROLE_ADMIN))
                .doneTasks(Collections.emptySet())
                .points(0)
                .build();

        userRepository.save(user);

        var task = Task.builder()
                .category(1)
                .description("Lorem ipsum")
                .flag("FLAG{test}")
                .points(100)
                .title("Easy task")
                .build();
        taskRepository.save(task);
        var task2 = Task.builder()
                .category(1)
                .description("Lorem ipsum")
                .flag("FLAG{test}")
                .points(100)
                .title("Easy task #2")
                .build();
        taskRepository.save(task2);

        var event1 = Event.builder()
                .date("09:00")
                .description("Rozpoczęto konkurs")
                .build();
        var event2 = Event.builder()
                .date("09:30")
                .description("Dodatno zadanie")
                .build();

        eventRepository.save(event1);
        eventRepository.save(event2);

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Scoreboard scoreboard = Scoreboard.builder()
                .value(0)
                .timestamp(timestamp.getTime())
                .username("a")
                .build();



        scoreboardRepository.save(scoreboard);

    }
}
