package pl.rafalrozek.ictf.dto.user;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponse {
    private String name;
    private Integer tasks;
    private Integer points;
    private String email;
}
