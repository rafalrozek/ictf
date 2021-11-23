package pl.rafalrozek.ictf.dto.auth;

import lombok.Data;

@Data
public class LoginRequest {
    private final String name;
    private final String password;
}
