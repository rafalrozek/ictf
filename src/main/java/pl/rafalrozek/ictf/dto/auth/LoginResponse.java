package pl.rafalrozek.ictf.dto.auth;

import lombok.Data;

@Data
public class LoginResponse {
    private final String jwtToken;
    private final String refreshToken;
}
