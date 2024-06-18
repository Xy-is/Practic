package com.example.pract.api.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class DepartmentDto {
    @Getter @Setter
    private Long id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private Long managerId;

    @Getter @Setter
    private List<EmployeeDto> employeeDtos; // Assuming you have a corresponding ProjectDto

    @Getter @Setter
    private List<ProjectDto> projectDtos; // Replace with actual DTOs if you have them


}
