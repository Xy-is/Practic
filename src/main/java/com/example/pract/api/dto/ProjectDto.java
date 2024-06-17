package com.example.pract.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class ProjectDto {
    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String description;

    @Getter @Setter
    private String departmentName;

    @Getter @Setter
    private String status;

    @Getter @Setter
    private List<TaskDto> taskDtos;


}
