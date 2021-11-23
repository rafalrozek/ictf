/*
 * Copyright (c) 2021.
 */

package pl.rafalrozek.ictf.dto.admin;

import lombok.Data;

import java.util.List;

@Data
public class SendNotificationRequest {
    List<String> users;
    String message;
}
