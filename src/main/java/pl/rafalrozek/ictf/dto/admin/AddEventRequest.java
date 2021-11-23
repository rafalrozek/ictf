/*
 * Copyright (c) 2021.
 */

package pl.rafalrozek.ictf.dto.admin;

import lombok.Data;

@Data
public class AddEventRequest {
    private String description;
    private String date;
}
