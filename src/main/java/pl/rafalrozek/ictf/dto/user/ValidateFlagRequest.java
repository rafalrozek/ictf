package pl.rafalrozek.ictf.dto.user;

import lombok.Data;

@Data
public class ValidateFlagRequest {
    private Long id;
    private String flag;
}
