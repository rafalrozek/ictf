/*
 * Copyright (c) 2021.
 */

package pl.rafalrozek.ictf.dto.admin;

import lombok.Data;

@Data
public class AddTaskRequest {
    private String title;
    private String description;
    private String flag;
    private Integer points;
    private Integer category;
}
