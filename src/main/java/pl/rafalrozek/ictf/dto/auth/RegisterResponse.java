package pl.rafalrozek.ictf.dto.auth;

import lombok.Data;
import pl.rafalrozek.ictf.model.Role;

import java.util.List;

@Data
public class RegisterResponse {
    private final Long id;
    private final String email;
    private final List<Role> roles;
}
