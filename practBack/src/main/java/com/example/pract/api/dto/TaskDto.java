package com.example.pract.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

public class TaskDto {
    @Getter @Setter
    private Long id;

    @Setter @Getter
    private String name;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String status;

    @Getter @Setter
    private Date dueDate;

    @Getter @Setter
    private String projectName;


}
