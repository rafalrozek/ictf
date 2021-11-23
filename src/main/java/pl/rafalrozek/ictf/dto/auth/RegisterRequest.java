package pl.rafalrozek.ictf.dto.auth;

import lombok.Data;

@Data
public class RegisterRequest {
    private final String email;
    private final String name;
    private final String password;
}
