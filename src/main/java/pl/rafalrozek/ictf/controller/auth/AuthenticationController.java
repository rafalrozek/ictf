package pl.rafalrozek.ictf.controller.auth;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.rafalrozek.ictf.dto.auth.*;
import pl.rafalrozek.ictf.model.RefreshToken;
import pl.rafalrozek.ictf.model.Role;
import pl.rafalrozek.ictf.model.Scoreboard;
import pl.rafalrozek.ictf.model.User;
import pl.rafalrozek.ictf.repository.ScoreboardRepository;
import pl.rafalrozek.ictf.repository.UserRepository;
import pl.rafalrozek.ictf.service.RefreshTokenService;
import pl.rafalrozek.ictf.service.user.UserService;
import pl.rafalrozek.ictf.util.JwtUtil;

import java.sql.Timestamp;
import java.util.Collections;

@Log4j2
@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth/")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokenService;
    private final ScoreboardRepository scoreboardRepository;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        ResponseEntity<LoginResponse> response = null;
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getName(), loginRequest.getPassword()
                    )
            ).getPrincipal();

            final User user = userService.getUserByName(loginRequest.getName());
            final String jwtToken = jwtUtil.generateToken(user);

            RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

            response = ResponseEntity.ok(
                    new LoginResponse(jwtToken, refreshToken.getToken())
            );
        } catch (BadCredentialsException badCredentialsException) {
            log.warn(badCredentialsException.getMessage());
            response = ResponseEntity.ok(
                    new LoginResponse(null, null)
            );
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        return response;
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();
        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtil.generateToken(user);
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token is not in database!"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        final User user = User.builder()
                .email(registerRequest.getEmail())
                .name(registerRequest.getName())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(Collections.singletonList(Role.ROLE_USER))
                .points(0)
                .build();

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());

        Scoreboard scoreboard = Scoreboard.builder()
                .value(0)
                .timestamp(timestamp.getTime())
                .username("a")
                .build();



        scoreboardRepository.save(scoreboard);
        userRepository.save(user);


        return ResponseEntity.ok(
                new RegisterResponse(user.getId(), user.getEmail(), Collections.singletonList(Role.ROLE_USER))
        );
    }

}
