package pl.rafalrozek.ictf.service.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.rafalrozek.ictf.model.Role;
import pl.rafalrozek.ictf.model.User;
import pl.rafalrozek.ictf.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public List<Role> getUserRole() {

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication
                .getAuthorities()
                .stream()
                .map(grantedAuthority -> (Role) grantedAuthority)
                .collect(Collectors.toList());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        final Optional<User> userOptional = userRepository.findByName(email);

        userOptional.orElseThrow(() -> {
            throw new UsernameNotFoundException("Not found " + email);
        });

        User user = userOptional.get();

        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(),
                user.getRoles()
        );
    }
}
