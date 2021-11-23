package pl.rafalrozek.ictf.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class TokenRefreshResponse {
    private String accessToken;
    private String refreshToken;
}
